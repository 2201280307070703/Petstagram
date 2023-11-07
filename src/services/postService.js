const Post = require('../models/Post');

exports.create = (postData, ownerId) => Post.create({...postData, owner: ownerId});

exports.getAll = () => Post.find({}).populate('owner');

exports.getOne = (postId) => Post.findById(postId).populate('owner').populate('comments.userId');

exports.delete = (postId) => Post.findByIdAndDelete(postId);

exports.edit = (postId, updatedData) => Post.findByIdAndUpdate(postId, updatedData);

exports.getAllByUserId = (userId) => Post.find({owner: userId});

exports.comment = async (postId, userId, comment) => {
    const post = await this.getOne(postId);

    post.comments.push({userId, comment});

    post.save();
}