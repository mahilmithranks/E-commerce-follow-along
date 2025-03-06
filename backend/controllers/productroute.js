let express = require("express");
const ProductModel = require("../model/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhadler = require("../utils/errorHandler");
const productRouter = express.Router();
const UserModel = require("../model/userModel");
const mongoose = require("mongoose");
const { productUpload } = require("../middleware/multer");

productRouter.get("/getAllProducts", catchAsyncError(async (req, res, next) => {
  const products = await ProductModel.find();
  res.status(200).json({
    success: true,
    products,
  });
}));

productRouter.get("/getUserProducts/:email", catchAsyncError(async (req, res, next) => {
  const { email } = req.params;
  if (!email) {
    return next(new Errorhadler("Email is required", 400));
  }
  
  const products = await ProductModel.find({ email });
  res.status(200).json({
    success: true,
    products,
  });
}));

productRouter.post(
  "/createProduct",
  productUpload.array("images", 10),
  catchAsyncError(async (req, res, next) => {
    const { email, name, description, category, tags, price, stock } = req.body;
    const images = req.files.map((file) => file.path);
    console.log(email, name, description, category, tags, price, images);

    if (
      !email ||
      !name ||
      !description ||
      !category ||
      !tags ||
      !price ||
      !images ||
      !stock
    ) {
      next(new Errorhadler("All fields are required", 400));
    }
    let user = await UserModel.findOne({ email });
    if (!user) {
      next(new Errorhadler("user is not exist", 404));
    }
    let product = new ProductModel({
      email,
      name,
      description,
      category,
      tags,
      price,
      images,
      stock,
    });

    //product.images=images.map(image=>`http://localhost:8975/${image}`)
    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  })
);

productRouter.put(
  "/updateProduct/:id",
  productUpload.array("images", 10),
  catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { email, name, description, category, tags, price, stock } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : null;

    // Validate product exists
    const product = await ProductModel.findById(id);
    if (!product) {
      return next(new Errorhadler("Product not found", 404));
    }

    // Validate user owns the product
    if (product.email !== email) {
      return next(new Errorhadler("Unauthorized to update this product", 403));
    }

    // Update product data
    const updateData = {
      name: name || product.name,
      description: description || product.description,
      category: category || product.category,
      tags: tags || product.tags,
      price: price || product.price,
      stock: stock || product.stock,
    };

    // Only update images if new ones are provided
    if (images && images.length > 0) {
      updateData.images = images;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  })
);

productRouter.delete("/deleteProduct/:id", catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.query;

  // Validate product exists
  const product = await ProductModel.findById(id);
  if (!product) {
    return next(new Errorhadler("Product not found", 404));
  }

  // Validate user owns the product
  if (product.email !== email) {
    return next(new Errorhadler("Unauthorized to delete this product", 403));
  }

  await ProductModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully"
  });
}));

module.exports = productRouter;
