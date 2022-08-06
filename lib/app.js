const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/bands', require('./controllers/bands'));
app.use('/cats', require('./controllers/cats'));
app.use('/pokemon', require('./controllers/pokemon'));
app.use('/beer', require('./controllers/beer'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
