const User = require('../models/userModel');

const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObject = (object, ...fields) => {
  const newObject = {};
  Object.keys(object).forEach((el) => {
    if (fields.includes(el)) newObject[el] = object[el];
  });
  return newObject;
};

// GET all users
exports.getAllUsers = getAll(User);

// GET specific user by id
exports.getUser = getOne(User);

// CREATE new user
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

// UPDATE specific user by id
exports.updateUser = updateOne(User);

// DELETE specific user by id
exports.deleteUser = deleteOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates', 400));
  }

  if (!req.body.name || !req.body.email) {
    return next(new AppError('You need to input your name and email', 400));
  }

  // 2) Update user document
  const filteredInput = filterObject(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    filteredInput,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedUser) return next(new AppError('That user does not exist', 400));

  // user.name = req.body.name;
  // user.email = req.body.email;
  // await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Successfully changed name and email',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
