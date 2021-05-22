const db = require('../database');
const Tweet = db.Tweet;
const User = db.User;

// Create tweet for current user
exports.createTweet = async (req, res) => {
  const { message } = req.body;
  if (!message) return;
  try {
    const userTweet = await Tweet.create({
      attributes: ['tweet_id', 'text', 'reply_count', 'retweet_count', 'createdAt'],
      user_id: req.userId,
      text: message,
    });
    res.status(200).json(userTweet);
  } catch(err) {
    res.status(400).send('Failed to create an account.');
  }
}

// Get all tweets
exports.getAllTweets = async (req, res) => {
  try {
    const userTweetData = await Tweet.findAll({
      attributes: ['tweet_id', 'text', 'reply_count', 'retweet_count', 'createdAt'],
      include: [{
        model: User,
        attributes: ['username']
      }],
      order: [
        ['tweet_id', 'DESC'],
      ],
    });
    res.status(200).json(userTweetData);
  } catch(err) {
    res.status(400).send('Failed to get tweets.');
  }
}

// Update tweet
exports.updateTweet = async (req, res) => {
  const { tweet_id, message } = req.body;
  if (!tweet_id) return;
  try {
    const userTweetData = await Tweet.findOne({
      attributes: ['tweet_id', 'text', 'reply_count', 'retweet_count', 'createdAt'],
      where: {
        tweet_id: tweet_id
      },
      include: [{
        model: User,
        attributes: ['username']
      }],
      order: [
        ['tweet_id', 'DESC'],
      ],
    });
    userTweetData.text = message;
    await userTweetData.save();
    res.status(200).json(userTweetData);
  } catch(err) {
    res.status(400).send('Failed to update tweet.');
  }
}

// Delete tweet
exports.deleteTweet = async (req, res) => {
  const { tweet_id } = req.body;
  if (!tweet_id) return;
  if (!req.userId) return;
  try {
    const userTweetData = await Tweet.findOne({
      attributes: ['tweet_id', 'text', 'reply_count', 'retweet_count', 'createdAt'],
      where: {
        tweet_id: tweet_id
      },
    });
    await userTweetData.destroy();
    res.status(200).json(userTweetData);
  } catch(err) {
    res.status(400).send('Failed to update tweet.');
  }
}

// Get all tweets for current user
exports.self = async (req, res) => {
  if (!req.userId) return;
  try {
    const userTweetData = await Tweet.findAll({
      attributes: ['text', 'reply_count', 'retweet_count', 'createdAt'],
      where: {
        user_id: req.userId 
      },
      include: [{
        model: User,
        attributes: ['username']
      }],
      order: [
        ['tweet_id', 'DESC'],
      ],
    });
    res.status(200).json(userTweetData);
  } catch(err) {
    res.status(400).send('Failed to get tweets.');
  }
}