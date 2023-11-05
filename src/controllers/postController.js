const router = require('express').Router();

const postService = require('../services/postService');

router.get('/create', (req, res) => {
    res.render('posts/create');
});

router.post('/create', async (req, res) => {
    const postData = req.body;
    const ownerId = req.user._id;

    await postService.create(postData, ownerId);
    res.redirect('/posts/catalog');
});

router.get('/catalog', async (req, res) => {
    const posts = await postService.getAll().lean();
    res.render('posts/catalog',{ posts });
});

module.exports = router;