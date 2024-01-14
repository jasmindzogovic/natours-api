const Tour = require('../models/tourModel');
const User = require('../models/userModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com',
    )
    .render('tour', {
      title: `${tour.name}`,
      tour,
    });
});

exports.login = catchAsync(async (req, res) => {
  res
    .status(200)
    .set('Content-Security-Policy', 'script-src-attr self')
    .render('login', {
      title: 'Log into your account',
    });
});

exports.getAccount = catchAsync(async (req, res) => {
  res.status(200).render('account', {
    title: 'User account',
    user: req.user,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true, runValidators: true },
  );

  res.status(200).render('account', {
    title: 'User account',
    user,
  });
});

exports.updateSettings = catchAsync(async (req, res) => {
  res.status(200).render('account', {
    title: 'Update your user data',
    user: req.user,
  });
});
