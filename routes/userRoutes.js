const router = require('express').Router();

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController');

const {
  signup,
  login,
  forgotPassowrd,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authenticationController');

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassowrd);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);

router.get('/me', protect, getMe, getUser);
router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
