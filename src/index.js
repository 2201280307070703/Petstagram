const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use('/static', express.static(path.resolve(__dirname,'public')));
app.use(express.urlencoded({extended: false}));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.set('views', path.resolve(__dirname,'views'));

app.use(routes);

app.listen(5555, () => console.log('Server is listening on port 5555'));