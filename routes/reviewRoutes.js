const router = require('express').Router({ mergeParams: true });

const {
  getAllReviews,
  createReview,
} = require('../controllers/reviewController');

const {
  restrictTo,
  protect,
} = require('../controllers/authenticationController');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
