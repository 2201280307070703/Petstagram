const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jwt');
const { SECRET } =require('../constants');

exports.register = async ({ username, email, password, repeatPassword }) => {
    const user = await User.findOne({
        $or: [{email}, {username}]
    });

    if(user){
        throw new Error('User exists!');
    }

   await User.create({username, email, password, repeatPassword});
};

exports.login = async ({ username, password}) => {
    const user = await User.findOne({ username });

    if(!user){
        throw new Error('Wrong username or password!');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
        throw new Error('Wrong username or password!');
    }

    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };

    const token = jwt.sign(payload, SECRET, {expiresIn: '2d'});

    return token;

};