import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    user: {type: String, ref: 'User', required: true},
    image: {type: String, required: true},
    caption: {type: String, default: ''},
    views: [{type: String, ref: 'User'}],
    expiresAt: {type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)}, // 24 hours
    createdAt: {type: Date, default: Date.now}
});

const Story = mongoose.model('Story', storySchema);

export default Story;