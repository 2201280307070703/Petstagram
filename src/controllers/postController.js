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
    try{
        const post = await postService.getOne(req.params.postId).lean();

        const isOwner = isUserOwner(req.user?._id, post.owner._id.toString());
    
        res.render('posts/details', { post, isOwner });
    }catch(error){
        res.statusCode(500).redirect('/posts/catalog');
    }
});

router.get('/:postId/delete', isAuth,  async (req, res) => {
   try{
        const post = await postService.getOne(req.params.postId);
        
        const userIsOwner = isUserOwner(req.user._id, post.owner._id.toString());
        if(userIsOwner){
            await postService.delete(req.params.postId);

            res.redirect('/posts/catalog');
        }else{
            throw Error();
        }
    }catch(error){
        res.status(404).redirect('/404');
    }
});

router.get('/:postId/edit', isAuth,  async (req, res) => {
    try{
        const post = await postService.getOne(req.params.postId).lean();

        const userIsOwner = isUserOwner(req.user._id, post.owner._id.toString());

        if(userIsOwner){
            res.render('posts/edit', {post});
        }else{
            throw Error();
        }
    }catch(error){
        res.status(404).redirect('/404');
    }
});

router.post('/:postId/edit', isAuth, async (req, res) => {
    const updatedData = req.body;
    const postId = req.params.postId;
    try{
        const post = await postService.getOne(postId);
        
        const userIsOwner = isUserOwner(req.user._id, post.owner._id.toString());

        if(userIsOwner){
            await postService.edit(postId, updatedData);
            res.redirect(`/posts/${postId}/details`);
        }else{
            throw Error();
        }
    }catch(eroor){
        res.status(404).redirect('/404');
    }
})

function isUserOwner(userId, ownerId){
    return userId === ownerId;
}
module.exports = router;