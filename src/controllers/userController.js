const router = require('express').Router();

const userService = require('../services/userService');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const {username, email, password, repeatPassword} = req.body;

    await userService.register({ username, email, password, repeatPassword });

    res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

module.exports = router;