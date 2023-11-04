const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { salt } = require('../constants');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is requited!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    }
});

userSchema.virtual('repeatPassword')
.set(function(value) {
    if(this.password !== value){
        throw new Error('Passord missmatch!');
    }
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash( this.password, salt );

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;