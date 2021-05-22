const express = require('express');
const router = express.Router();
const tweetsController = require('../controllers/tweet.controller');
const auth = require('../middlewares/auth');

// Create tweet for current user
router.post('/', auth, async (req, res) => {
  await tweetsController.createTweet(req, res);
});

// Get all tweets
router.get('/', auth, async (req, res) => {
  await tweetsController.getAllTweets(req, res);
});

// Update tweet
router.put('/', auth, async (req, res) => {
  await tweetsController.updateTweet(req, res);
});

// Delete tweet
router.delete('/', auth, async (req, res) => {
  await tweetsController.deleteTweet(req, res);
});

// Get all tweets for self
router.get('/self', auth, async (req, res) => {
  await tweetsController.self(req, res);
});

module.exports = router;