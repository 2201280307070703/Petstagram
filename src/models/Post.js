const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    image: {
        type: String,
        required: [true, 'Image link is required!']
    },
    age: {
        type: Number,
        required: [true, 'Age is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    },
    location: {
        type: String,
        required: [true, 'Location is required!']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;