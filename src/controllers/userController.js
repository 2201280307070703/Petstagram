const router = require('express').Router();

const userService = require('../services/userService');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const {username, email, password, repeatPassword} = req.body;

    const token = await userService.register({ username, email, password, repeatPassword });

    res.cookie('auth', token, {httpOnly: true});

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const token = await userService.login({ username, password });

    res.cookie('auth', token, {httpOnly: true});

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

module.exports = router;