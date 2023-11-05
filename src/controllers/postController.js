const router = require('express').Router();

const postService = require('../services/postService');

router.get('/create', (req, res) => {
    res.render('posts/create');
});

router.post('/create', async (req, res) => {
    const postData = req.body;
    const ownerId = req.params._id;

    await postService.create(postData, ownerId);
    res.redirect('/posts/catalog');
});

module.exports = router;