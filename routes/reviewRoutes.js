const router = require('express').Router();

const {
  getAllReviews,
  createReview,
} = require('../controllers/reviewController');

router.route('/').get(getAllReviews).post(createReview);

module.exports = router;
