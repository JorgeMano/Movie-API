const express = require('express');

//const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { actorsRouter } = require('./router/actors.router');
const { moviesRouter } = require('./router/movies.router');
const { usersRouter } = require('./router/users.router');

//const { AppError } = require('./util/appError');

const app = express();

app.use(express.json());

// EndPoints

/*app.use('*', (req, res, next) => {
    next(new AppError(404, `${req.originalUrl} not found in this server.`));
});
*/
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/users', usersRouter);
//app.use(globalErrorHandler);

module.exports = { app };
