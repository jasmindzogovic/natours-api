const router = require('express').Router();

const { protect } = require('../controllers/authenticationController');
const { getCheckoutSession } = require('../controllers/bookingController');

router.get('/checkout-session/:tourId', protect, getCheckoutSession);

module.exports = router;
