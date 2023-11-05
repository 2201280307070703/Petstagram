const Post = require('../models/Post');

exports.create = (postData, ownerId) => Post.create({...postData, owner: ownerId});

exports.getAll = () => Post.find({}).populate('owner');

exports.getOne = (postId) => Post.findById(postId).populate('owner');