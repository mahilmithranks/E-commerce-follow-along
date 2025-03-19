let express = require("express");
const ProductModel = require("../model/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhadler = require("../utils/errorHandler");
const productRouter = express.Router();
const UserModel = require("../model/userModel");
const mongoose = require("mongoose");
const { productUpload } = require("../middleware/multer");
const { isAuthenticatedUser } = require("../middleware/auth");

productRouter.get("/getAllProducts", catchAsyncError(async (req, res, next) => {
  const products = await ProductModel.find();
  res.status(200).json({
    success: true,
    products,
  });
}));

productRouter.get("/getUserProducts/:email", isAuthenticatedUser, catchAsyncError(async (req, res, next) => {
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
  isAuthenticatedUser,
  productUpload.array("images", 10),
  catchAsyncError(async (req, res, next) => {
    const { name, description, category, tags, price, stock } = req.body;
    const images = req.files.map((file) => file.path);

    if (!name || !description || !category || !tags || !price || !stock || !images.length) {
      return next(new Errorhadler("All fields are required", 400));
    }

    const product = new ProductModel({
      email: req.user.email,
      name,
      description,
      category,
      tags: typeof tags === 'string' ? JSON.parse(tags) : tags,
      price,
      images,
      stock,
    });

    await product.save();
    
    res.status(201).json({ 
      success: true,
      message: "Product created successfully",
      product
    });
  })
);

productRouter.put(
  "/updateProduct/:id",
  isAuthenticatedUser,
  productUpload.array("images", 10),
  catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, category, tags, price, stock } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : null;

    // Validate product exists
    const product = await ProductModel.findById(id);
    if (!product) {
      return next(new Errorhadler("Product not found", 404));
    }

    // Validate user owns the product
    if (product.email !== req.user.email) {
      return next(new Errorhadler("Unauthorized to update this product", 403));
    }

    // Update product data
    const updateData = {
      name: name || product.name,
      description: description || product.description,
      category: category || product.category,
      tags: tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : product.tags,
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

productRouter.delete(
  "/deleteProduct/:id", 
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    // Validate product exists
    const product = await ProductModel.findById(id);
    if (!product) {
      return next(new Errorhadler("Product not found", 404));
    }

    // Validate user owns the product
    if (product.email !== req.user.email) {
      return next(new Errorhadler("Unauthorized to delete this product", 403));
    }

    await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
}));

module.exports = productRouter;
