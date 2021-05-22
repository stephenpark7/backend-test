const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/message.controller');
const auth = require('../middlewares/auth');

// Create message for current user
router.post('/', auth, async (req, res) => {
  await messagesController.createMessage(req, res);
});

// Get all messages
router.get('/', auth, async (req, res) => {
  await messagesController.getAllMessages(req, res);
});

// Update message
router.put('/', auth, async (req, res) => {
  await messagesController.updateMessage(req, res);
});

// Delete message
router.delete('/', auth, async (req, res) => {
  await messagesController.deleteMessage(req, res);
});

module.exports = router;