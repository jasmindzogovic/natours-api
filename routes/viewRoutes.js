const router = require('express').Router();

const {
  getOverview,
  getTour,
  login,
} = require('../controllers/viewsController');

const { protect } = require('../controllers/authenticationController');

router.get('/', getOverview);

router.get('/tour/:slug', protect, getTour);

router.get('/login', login);

module.exports = router;
