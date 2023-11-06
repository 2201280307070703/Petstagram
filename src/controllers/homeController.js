const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home/index');
});

router.get('/404', (req, res) => {
    res.render('home/404');
});

module.exports = router;