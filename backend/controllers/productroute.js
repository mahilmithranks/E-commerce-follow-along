let express = require("express");
const ProductModel = require("../model/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhadler = require("../utils/errorHandler");
const productRouter = express.Router();
const UserModel = require("../model/userModel");
const mongoose = require("mongoose");
const { productUpload } = require("../middleware/multer");

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

module.exports = productRouter;
