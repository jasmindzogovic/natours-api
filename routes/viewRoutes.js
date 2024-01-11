const router = require('express').Router();

const {
  getOverview,
  getTour,
  login,
} = require('../controllers/viewsController');

router.get('/', getOverview);

router.get('/tour/:slug', getTour);

router.get('/login', login);

module.exports = router;
