const Post = require('../models/Post');

exports.create = (postData, ownerId) => Post.create({...postData, owner: ownerId});

exports.getAll = () => Post.find({}).populate('owner');