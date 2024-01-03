const router = require('express').Router({ mergeParams: true });

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController');

const {
  restrictTo,
  protect,
} = require('../controllers/authenticationController');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router.route('/:id').patch(updateReview).delete(deleteReview).get(getReview);

module.exports = router;
