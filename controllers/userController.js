const User = require("../models/userModel");
const catchAsyncError = require("./../utils/CatchAsync");
const AppError = require("./../utils/AppError");

// Getting all users from DB ----------> Tested (Working)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const userData = await User.find();

  if (!userData) {
    return next(new AppError("No Users Found", 404));
  }

  res.status(200).json({
    status: "success",
    results: userData.length,
    data: {
      data: userData,
    },
  });
});

// Creating a new user ----------> Tested (Working)
exports.createUser = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create(req.body);

  if (!newUser) {
    return next(new AppError("Error creating new User. Please try again!"));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
});

// Getting A single user ----------> Tested (Working)
exports.getUser = catchAsyncError(async (req, res, next) => {
  const searchedUser = await User.findOne({ _id: req.params.id });

  if (!searchedUser) {
    return next(new AppError("User Not Found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: searchedUser,
    },
  });
});

// Updating the particular user from DB ----------> Tested (Working)
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError("User Not Found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: updatedUser,
    },
  });
});

// Deleting the particular user from DB ----------> Tested (Working)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return next(new AppError("User Not Found", 404));
  }

  res.status(204).json({
    status: "success",
    data: "none",
  });
});
