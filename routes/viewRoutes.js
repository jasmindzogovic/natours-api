const router = require('express').Router();

const {
  getOverview,
  getTour,
  login,
  getAccount,
} = require('../controllers/viewsController');

const {
  isLoggedIn,
  protect,
} = require('../controllers/authenticationController');

router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, login);
router.get('/me', protect, getAccount);

module.exports = router;
