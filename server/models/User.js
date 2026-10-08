import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    full_name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    bio: {type: String, default: 'Hey there! I am using PingUp.'},
    profile_picture: {type: String, default: ''},
    cover_photo: {type: String, default: ''},
    location: {type: String, default: ''},
<<<<<<< HEAD
    followers: [{type:String,ref:'User'}],
    following: [{type: String, ref:'User'}],
    connections: [{type: String,ref: 'User'}],
},{timestamps: true, minimize: false})
=======
    followers: [{type: String, ref: 'User'}],
    following: [{type: String, ref: 'User'}],
    connections: [{type: String, ref: 'User'}],
}, {timestamps: true, minimize: false})
>>>>>>> 4f609148e22231a911e8b6ff902b38eccfbd16e3

const User = mongoose.model('User', userSchema)

export default User