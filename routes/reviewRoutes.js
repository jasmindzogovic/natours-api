const router = require('express').Router({ mergeParams: true });

const {
  getAllReviews,
  createReview,
  deleteReview,
} = require('../controllers/reviewController');

const {
  restrictTo,
  protect,
} = require('../controllers/authenticationController');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

router.route('/:id').delete(deleteReview);

module.exports = router;
