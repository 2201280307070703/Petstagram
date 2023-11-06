const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelper');
const postService = require('../services/postService');

router.get('/create', isAuth, (req, res) => {
    res.render('posts/create');
});

router.post('/create', isAuth, async (req, res) => {
    const postData = req.body;
    const ownerId = req.user._id;

    try{
        await postService.create(postData, ownerId);
        res.redirect('/posts/catalog');
    }catch(error){
        res.render('posts/create', {errorMessage: getErrorMessage(error)});
    }
});

router.get('/catalog', async (req, res) => {
    try{
        const posts = await postService.getAll().lean();
        res.render('posts/catalog', { posts });
    }catch(error){
        res.status(500).redirect('/500');
    }
});

router.get('/:postId/details', async (req, res) => {
    const post = await postService.getOne(req.params.postId).lean();

    const isOwner = req.user?._id === post.owner._id.toString();

    res.render('posts/details', { post, isOwner });
});

router.get('/:postId/delete', isAuth,  async (req, res) => {
    await postService.delete(req.params.postId);

    res.redirect('/posts/catalog');
});

router.get('/:postId/edit', isAuth,  async (req, res) => {
    const post = await postService.getOne(req.params.postId).lean();

    res.render('posts/edit', {post});
});

router.post('/:postId/edit', isAuth, async (req, res) => {
    const updatedData = req.body;
    const postId = req.params.postId;
    
    await postService.edit(postId, updatedData);
    res.redirect(`/posts/${postId}/details`);
})
module.exports = router;