const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');

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

  const bookings = await Booking.find({ tour: tour._id });

  const booked = await Booking.find({
    tour: tour._id,
    user: res.locals.user.id,
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name}`,
    tour,
    bookings,
    booked,
  });
});

exports.getTourBookings = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const tour = await Tour.findOne({ _id: id });

  const bookings = await Booking.find({ tour: tour._id });

  res.status(200).render('bookings', {
    title: `${tour.name}`,
    bookings,
  });
});

exports.login = catchAsync(async (req, res) => {
  res.status(200).render('login', {
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

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign up for an account',
  });
});

exports.bookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'Bookings',
    tours,
  });
});

exports.reviews = catchAsync(async (req, res, next) => {
  const userReviews = await Review.find({ user: req.user.id });

  res.status(200).render('reviews', {
    title: 'My Reviews',
    userReviews,
  });
});
