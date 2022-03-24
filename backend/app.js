const express = require('express');

//const { globalErrorHandler } = require('./controllers/error.controller');
const { sequelize } = require('./util/database');
// Routers
const { actorsRouter } = require('./router/actors.router');
const { moviesRouter } = require('./router/movies.router');
const { usersRouter } = require('./router/users.router');

//const { AppError } = require('./util/appError');

const app = express();

app.use(express.json());

// EndPoints

app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/users', usersRouter);
//app.use(globalErrorHandler);
sequelize
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

//initModels();

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
//module.exports = { app };
