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

  const newUser =  await User.create({username, email, password, repeatPassword});

  const token = await generateToken(newUser);

  return token;
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

    const token = await generateToken( user );

    return token;

};

exports.getOne = (userId) => User.findById(userId);

async function generateToken ( user ){
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };

    const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'});

    return token;
};