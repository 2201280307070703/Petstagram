const User = require('../models/User');

exports.register = async ({ username, email, password, repeatPassword }) => {
    const user = await User.findOne({
        $or: [{email}, {username}]
    });

    if(user){
        throw new Error('User exists!');
    }

   await User.create({username, email, password, repeatPassword});
};