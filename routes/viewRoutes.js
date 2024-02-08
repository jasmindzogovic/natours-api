const router = require('express').Router();

const {
  getOverview,
  getTour,
  login,
  getAccount,
  updateUserData,
  signup,
  bookings,
  reviews,
  getTourBookings,
  alerts,
} = require('../controllers/viewsController');

const {
  isLoggedIn,
  protect,
  restrictTo,
} = require('../controllers/authenticationController');

router.use(alerts);

router.get('/signup', signup);
router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/tour/:id/bookings', protect, restrictTo('admin'), getTourBookings);
router.get('/login', isLoggedIn, login);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, bookings);
router.get('/my-reviews', protect, reviews);
router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
