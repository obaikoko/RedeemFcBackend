const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserInfo,
  updateUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', registerUser);
router.put('/:id', updateUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUserInfo);
router.get('/me', protect, getMe);
module.exports = router;
