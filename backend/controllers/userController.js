import { UserModel } from "../model/userModel.js";
import { Errorhadler } from "../utils/errorhadler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail.js";

// Register new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return next(
        new Errorhadler("Name, email and password are required", 400)
      );
    }

    let user = await UserModel.findOne({ email });
    if (user) {
      return next(new Errorhadler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const activationUrl = `http://localhost:${process.env.PORT}/api/user/activation/${token}`;

    await sendMail({
      email: newUser.email,
      subject: "Activate your account",
      message: `Hello ${newUser.name}, please click the link to activate your account: ${activationUrl}`,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email to activate your account.",
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Errorhadler("Email and password are required", 400));
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new Errorhadler("Invalid email or password", 401));
    }

    if (!user.isActivated) {
      return next(new Errorhadler("Please activate your account first", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new Errorhadler("Invalid email or password", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Get user profile
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        addresses: user.addresses || [],
      },
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Update user address
export const updateAddress = async (req, res, next) => {
  try {
    const { street, city, state, zipCode, country } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    if (!street || !city || !state || !zipCode || !country) {
      return next(new Errorhadler("All address fields are required", 400));
    }

    const newAddress = {
      street,
      city,
      state,
      zipCode,
      country,
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

export const getUserAddresses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select("addresses");

    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      addresses: user.addresses || [],
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};

// Get a specific address by ID
export const getAddressById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }

    const address = user.addresses.find(
      (addr) => addr._id.toString() === addressId
    );

    if (!address) {
      return next(new Errorhadler("Address not found", 404));
    }

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    next(new Errorhadler(error.message, 500));
  }
};
