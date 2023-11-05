const jwt = require('../lib/jwt');
const { SECRET, authorizationCookieName } = require('../constants');

exports.auth = async (req, res, next) => {
    const token = req.cookies[authorizationCookieName];

    if(token){
        try{
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

            next();
        }catch(err){
            res.clearCookie(authorizationCookieName);

            res.redirect('/users/login');
        }
    }else{
        next();
    }
}

exports.isAuth = (req, res, next) => {
    if(!req.user){
        return redirect('/users/login');
    }

    next();
}