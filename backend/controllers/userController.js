const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create a new user
      user = new User({
        name,
        email,
        password
      });
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save user in the database
      await user.save();
  
      // Create and return a JWT token
      const payload = {
        user: {
          id: user.id
        }
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // User matched, create JWT payload
      const payload = {
        user: {
          id: user.id
        }
      };
  
      // Sign the token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5h' }, // Token expires in 5 hours
        (err, token) => {
          if (err) throw err;
          res.json({ token, userId: user.id });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};

// Forget Password
exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'No account with that email address exists.' });
      }
  
      // Generate a token
      const token = crypto.randomBytes(20).toString('hex');
  
      // Set token and expiry date on user model
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
      await user.save();
  
      // Send email
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Change to your preferred service
        auth: {
          user: 'jay.r.2412001@gmail.com', // Your email
          pass: 'wfds ztlg exyh riog' // Your email password
        }
      });
  
      const mailOptions = {
        to: email,
        from: 'jay.r.2412001@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://localhost:8080/' + 'reset-password/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
  
      transporter.sendMail(mailOptions, function(err) {
        if (err) {
          return res.status(500).send({ msg: 'Email could not be sent.' });
        }
        res.status(200).json({ msg: 'An e-mail has been sent to ' + email + ' with further instructions.' });
      });
    } catch (err) {
      res.status(500).send({ msg: 'Error on the server.' });
    }
  };

  exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
      const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
      if (!user) {
        return res.status(400).json({ msg: 'Password reset token is invalid or has expired.' });
      }
  
      // Set the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
      res.status(200).json({ msg: 'Password has been changed.' });
    } catch (err) {
      res.status(500).send({ msg: 'Error on the server.' });
    }
};

// Logout User
exports.logoutUser = async (req, res) => {
    res.status(200).send({ msg: 'Logged out successfully. Please remove your token.' });
};
