const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const path = require('path');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const routes = require('./routes');

const app = express();

expressConfig(app);
handlebarsConfig(app);

mongoose.connect('mongodb://127.0.0.1:27017/petstagram')
.then(() => console.log('DB is connected!'));

app.use(routes);

app.listen(5555, () => console.log('Server is listening on port 5555'));