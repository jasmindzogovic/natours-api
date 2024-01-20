const router = require('express').Router();

const {
  getOverview,
  getTour,
  login,
  getAccount,
  updateUserData,
  signup,
  bookings,
} = require('../controllers/viewsController');

const {
  isLoggedIn,
  protect,
} = require('../controllers/authenticationController');

const { createBookingCheckout } = require('../controllers/bookingController');

router.get('/signup', signup);
router.get('/', createBookingCheckout, isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, login);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, bookings);
router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
