const mongoose = require('mongoose');

async function dbConnect(uri){
    await mongoose.connect(uri);
}

module.exports = dbConnect;