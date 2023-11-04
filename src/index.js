const express = require('express');
const routes = require('./routes');

const app = express();

app.use('/static', express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(routes);

app.listen(5555, () => console.log('Server is listening on port 5555'));