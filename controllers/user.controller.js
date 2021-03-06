const db = require('../database');
const User = db.User;
const bcrypt = require("bcryptjs");
const validator = require('validator');

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Create a new account
exports.create = async (req, res) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    res.status(400).send('Missing field(s)');
    return;
  }

  // Username validation
  if (!validator.isAlphanumeric(username)) {
    res.status(400).send('Username must contain only alphanumeric characters.');
    return;
  }

  // Check if username already in use
  const userData = await User.findOne({ where: { username: username } });
  if (userData !== null) {
    res.status(400).send('Username already in use.');
    return;
  }

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to database
  User.create({
    username: username,
    password: hashedPassword,
    display_name: username,
  }).then(user => {
    res.status(200).send('Successfully created an account.');
  }).catch(err => {
    res.status(400).send('Failed to create an account.');
  });
}

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    res.status(400).send('Missing field(s)');
    return;
  }

  // Get user data
  const userData = await User.findOne({ where: { username: username } });
  if (userData === null) {
    res.status(400).send('Username does not exist.');
    return;
  }

  // Check password
  if (await bcrypt.compare(password, userData.password)) {
    const token = jwt.sign({ user_id: userData.user_id }, jwtSecret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      user_id: userData.user_id,
      username: username,
      display_name: userData.display_name,
      accessToken: token,
    });
  } else {
    res.status(400).send('Incorrect password.');
  }
}