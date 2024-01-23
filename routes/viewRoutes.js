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
} = require('../controllers/viewsController');

const {
  isLoggedIn,
  protect,
} = require('../controllers/authenticationController');

router.get('/signup', signup);
router.get('/', isLoggedIn, getOverview);
router.route('/tour/:slug').get(isLoggedIn, getTour);
router.get('/login', isLoggedIn, login);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, bookings);
router.get('/my-reviews', protect, reviews);
router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
