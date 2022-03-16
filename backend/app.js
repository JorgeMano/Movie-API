const express = require('express');

//const { globalErrorHandler } = require('./controllers/error.controller');

// Routers

const { AppError } = require('./util/appError'); 

const app = express();

app.use(express.json());

// EndPoints

app.use('*', (req, res, next) => {
    next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

//app.use(globalErrorHandler);

module.exports = { app };