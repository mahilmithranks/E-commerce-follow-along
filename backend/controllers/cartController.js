import pkg from "../model/userModel.js";
const { UserModel } = pkg;
import errorUtils from "../utils/errorHandler.js";
const { ErrorHandler } = errorUtils;
import { ProductModel } from "../model/productModel.js";

// Get cart items
export const getCartItems = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).populate("cart.productId");

    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Update cart quantity
export const updateCartQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity) {
      return next(new Errorhadler("Product ID and quantity are required", 400));
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return next(new Errorhadler("Product not found", 404));
    }

    // Check if product exists in cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex === -1) {
      return next(new Errorhadler("Product not found in cart", 404));
    }

    // Check if requested quantity is available
    if (quantity > product.stock) {
      return next(
        new Errorhadler("Requested quantity exceeds available stock", 400)
      );
    }

    // Update quantity
    user.cart[cartItemIndex].quantity = quantity;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      cart: user.cart,
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Remove item from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    // Remove the item from cart
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};
