const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserInfo,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUserInfo);
router.get('/me', protect, getMe);
module.exports = router;
