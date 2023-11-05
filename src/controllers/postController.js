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
    res.render('posts/catalog', { posts });
});

router.get('/:postId/details', async (req, res) => {
    const post = await postService.getOne(req.params.postId).lean();

    const isOwner = req.user?._id === post.owner._id.toString();

    res.render('posts/details', { post, isOwner });
});

router.get('/:postId/delete', async (req, res) => {
    await postService.delete(req.params.postId);

    res.redirect('/posts/catalog');
});

router.get('/:postId/edit', async (req, res) => {
    const post = await postService.getOne(req.params.postId).lean();

    res.render('posts/edit', {post});
});

router.post('/:postId/edit', async (req, res) => {
    const updatedData = req.body;
    const postId = req.params.postId;
    
    await postService.edit(postId, updatedData);
    res.redirect(`/posts/${postId}/details`);
})
module.exports = router;