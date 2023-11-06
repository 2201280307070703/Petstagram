const router = require('express').Router();

const { authorizationCookieName } = require('../constants');
const {isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelper');
const userService = require('../services/userService');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const {username, email, password, repeatPassword} = req.body;

    try{
        const token = await userService.register({ username, email, password, repeatPassword });

        res.cookie(authorizationCookieName, token, {httpOnly: true});

        res.redirect('/');
    }catch(error){
        res.render('users/register', {errorMessage: getErrorMessage(error)});
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        const token = await userService.login({ username, password });

        res.cookie(authorizationCookieName, token, {httpOnly: true});

        res.redirect('/');
    }catch(error){
        res.render('users/login', {errorMessage: getErrorMessage(error)});
    }
});

router.get('/logout', isAuth, (req, res) => {
    try{
        res.clearCookie(authorizationCookieName);

        res.redirect('/');
    }catch(error){
        res.status(404).redirect('/404');
    }
});

router.get('/profile', isAuth, async (req, res) => {
    const userId = req.user._id;
    try{
        const user = await userService.getOne(userId).lean();

        res.render('users/profile', {user});
    }catch(error){
        res.status(404).redirect('/404');
    }
});

module.exports = router;