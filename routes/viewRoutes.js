const router = require('express').Router();

const {
  getOverview,
  getTour,
  login,
  getAccount,
  updateUserData,
  signup,
} = require('../controllers/viewsController');

const {
  isLoggedIn,
  protect,
} = require('../controllers/authenticationController');

router.get('/signup', signup);
router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, login);
router.get('/me', protect, getAccount);
router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
