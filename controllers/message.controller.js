const db = require('../database');
const Message = db.Message;
const User = db.User;

// Create message for current user
exports.createMessage = async (req, res) => {
  const { recipient_user_id, message } = req.body;
  if (!message || !recipient_user_id) return;
  try {
    const userMessage = await Message.create({
      attributes: ['message_id', 'text', 'sender_user_id', 'recipient_user_id', 'createdAt'],
      sender_user_id: req.userId,
      recipient_user_id: recipient_user_id,
      text: message,
    });
    const recipientUserData = await User.findOne({
      attributes: ['user_id'],
      where: {
        user_id: recipient_user_id
      },
    });
    if (!recipientUserData) return;
    res.status(200).json(userMessage);
  } catch(err) {
    res.status(400).send('Failed to create message.');
  }
}

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const userMessageData = await Message.findAll({
      attributes: ['message_id', 'sender_user_id', 'recipient_user_id', 'text', 'createdAt'],
      include: [{
        model: User,
        attributes: ['username']
      }],
      order: [
        ['message_id', 'DESC'],
      ],
    });
    res.status(200).json(userMessageData);
  } catch(err) {
    res.status(400).send('Failed to get all messages.');
  }
}

// Update message
exports.updateMessage = async (req, res) => {
  const { message_id, message } = req.body;
  if (!message_id) return;
  try {
    const userMessageData = await Message.findOne({
      attributes: ['message_id', 'text', 'sender_user_id', 'recipient_user_id', 'createdAt'],
      where: {
        message_id: message_id
      },
      include: [{
        model: User,
        attributes: ['username']
      }],
      order: [
        ['message_id', 'DESC'],
      ],
    });
    userMessageData.text = message;
    await userMessageData.save();
    res.status(200).json(userMessageData);
  } catch(err) {
    res.status(400).send('Failed to update message.');
  }
}

// Delete message
exports.deleteMessage = async (req, res) => {
  const { message_id } = req.body;
  if (!message_id) return;
  if (!req.userId) return;
  try {
    const userMessageData = await Message.findOne({
      attributes: ['message_id', 'text', 'sender_user_id', 'recipient_user_id', 'createdAt'],
      where: {
        message_id: message_id
      },
    });
    await userMessageData.destroy();
    res.status(200).json(userMessageData);
  } catch(err) {
    res.status(400).send('Failed to delete message.');
  }
}