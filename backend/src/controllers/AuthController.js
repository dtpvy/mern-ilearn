const User = require('../models/User');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

class UserController {

  // GET /
  async init(req, res) {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: 'Internal server error' });
    }
  }

  // POST /register
  async register(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Missing username or password' });
    }

    try {
      const user = await User.findOne({ username });

      if (user) {
        return res.status(400).json({ success: false, message: 'Username is already exist' });
      }

      const hashPassword = await argon2.hash(password);

      const newUser = new User({ username, password: hashPassword });
      await newUser.save();

      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(200).json({
        success: true,
        message: 'User created successfully',
        accessToken
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, message: 'Internal server error' })
    }
  }

  // POST /login
  async login(req, res) {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Missing username or password' });
    }

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ success: false, message: 'Incorrect username or password' });
      }

      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: 'Incorrect username or password' });
      }

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        accessToken
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, message: 'Internal server error' })
    }
  }

};

module.exports = new UserController();