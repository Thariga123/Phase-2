import Connection from '../models/Connection.js';
import sanitizeHtml from 'sanitize-html';

export const getMessages = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.connectionId)
      .populate('messages.sender', 'username');
    res.json(connection.messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const connection = await Connection.findById(req.params.connectionId);
    if (!connection.users.includes(req.user.userId)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    connection.messages.push({
      sender: req.user.userId,
      content: sanitizedContent,
    });
    await connection.save();
    res.json({ message: 'Message sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};