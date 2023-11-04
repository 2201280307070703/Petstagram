const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const path = require('path');

const expressConfig = require('./config/expressConfig');

const routes = require('./routes');

const app = express();

expressConfig(app);

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.set('views', path.resolve(__dirname,'views'));

mongoose.connect('mongodb://127.0.0.1:27017/petstagram')
.then(() => console.log('DB is connected!'));

app.use(routes);

app.listen(5555, () => console.log('Server is listening on port 5555'));