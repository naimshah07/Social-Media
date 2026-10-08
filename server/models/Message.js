import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {type: String, ref: 'User', required: true},
    receiver: {type: String, ref: 'User', required: true},
    content: {type: String, required: true},
    read: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

const Message = mongoose.model('Message', messageSchema);

export default Message;