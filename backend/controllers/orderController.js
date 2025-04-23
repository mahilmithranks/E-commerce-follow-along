import OrderModel from "../model/orderModel.js";
import { UserModel } from "../model/userModel.js";
import { ProductModel } from "../model/productModel.js";
import errorUtils from "../utils/errorHandler.js";
const { ErrorHandler } = errorUtils;

// Create a new order
export const createOrder = async (req, res, next) => {
  try {
    const { addressId } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!addressId) {
      return next(new Errorhadler("Shipping address is required", 400));
    }

    // Get user with cart items
    const user = await UserModel.findById(userId).populate("cart.productId");

    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    // Check if cart is empty
    if (user.cart.length === 0) {
      return next(new Errorhadler("Cart is empty", 400));
    }

    // Check if address exists
    const addressExists = user.address.some(
      (addr) => addr._id.toString() === addressId
    );

    if (!addressExists) {
      return next(new Errorhadler("Address not found", 404));
    }

    // Create order items and calculate total price
    const orderItems = [];
    let totalPrice = 0;

    for (const item of user.cart) {
      // Check if product exists and has enough stock
      const product = await ProductModel.findById(item.productId._id);

      if (!product) {
        return next(
          new Errorhadler(`Product ${item.productId.name} not found`, 404)
        );
      }

      if (product.stock < item.quantity) {
        return next(
          new Errorhadler(
            `Insufficient stock for ${product.name}. Available: ${product.stock}`,
            400
          )
        );
      }

      // Add to order items
      orderItems.push({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      });

      // Update total price
      totalPrice += item.productId.price * item.quantity;

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create the order
    const order = await OrderModel.create({
      user: userId,
      orderItems,
      shippingAddress: addressId,
      totalPrice,
    });

    // Clear the user's cart
    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Get order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await OrderModel.findById(orderId)
      .populate("orderItems.productId")
      .populate("user", "name email");

    if (!order) {
      return next(new Errorhadler("Order not found", 404));
    }

    // Check if the order belongs to the user (unless admin)
    if (order.user._id.toString() !== userId && req.user.role !== "admin") {
      return next(
        new Errorhadler("You are not authorized to view this order", 403)
      );
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Get all orders for a user by email
export const getUserOrdersByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    const orders = await OrderModel.find({ user: user._id }).sort("-createdAt");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Place a new order using user email
export const placeOrder = async (req, res, next) => {
  try {
    const { products, address } = req.body;
    const userEmail = req.user.email;

    // Retrieve user by email
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    // Create orders for each product
    const orders = products.map(async (product) => {
      const order = new OrderModel({
        user: user._id,
        orderItems: [
          {
            productId: product.id,
            quantity: product.quantity,
            price: product.price,
          },
        ],
        shippingAddress: address,
        totalPrice: product.price * product.quantity,
      });
      await order.save();
      return order;
    });

    // Wait for all orders to be created
    await Promise.all(orders);

    res
      .status(201)
      .json({ success: true, message: "Orders placed successfully" });
  } catch (error) {
    next(error);
  }
};

// Cancel an order
export const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return next(new Errorhadler("Order not found", 404));
    }

    // Check if the order belongs to the user (unless admin)
    if (order.user.toString() !== userId && req.user.role !== "admin") {
      return next(
        new Errorhadler("You are not authorized to cancel this order", 403)
      );
    }

    // Check if order is already cancelled
    if (order.status === "Cancelled") {
      return next(new Errorhadler("Order is already cancelled", 400));
    }

    // Update order status to cancelled
    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};
