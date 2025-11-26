import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    timestamp: { type: Date, default: Date.now },
  }],
  isActive: { type: Boolean, default: true },
});

export default mongoose.model('Connection', connectionSchema);