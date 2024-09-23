const express = require('express');
const { signup, login, changePassword, deleteUser } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/change-password', auth, changePassword);
router.delete('/delete-account', auth, deleteUser);

module.exports = router;
