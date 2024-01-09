const router = require('express').Router();

const { getOverview, getTour } = require('../controllers/viewsController');

router.get('/', getOverview);

router.get('/tour/:slug', getTour);

module.exports = router;
