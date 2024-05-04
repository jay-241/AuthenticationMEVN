const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgetPassword, resetPassword, logoutUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword', resetPassword);
router.get('/logout', logoutUser);

module.exports = router;
