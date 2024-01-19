const router = require('express').Router();

const { protect } = require('../controllers/authenticationController');
const { getCheckoutSession } = require('../controllers/bookingController');

router.get('/checkout-session/:tourID', protect, getCheckoutSession);

module.exports = router;
