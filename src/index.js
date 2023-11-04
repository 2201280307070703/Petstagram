const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConnect = require('./config/mongooseConfig');

const routes = require('./routes');

const {PORT, uri} = require('./constants');

const app = express();

expressConfig(app);
handlebarsConfig(app);

dbConnect(uri)
.then(() => console.log('DB is connected'))
.catch(err => console.log('DB ERROR:' ,err.message));

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));