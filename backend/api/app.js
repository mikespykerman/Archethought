const express = require('express');
require('dotenv').config('../.env');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Sequelize } = require('sequelize');

const { configureExpressMiddleware } = require("./middleware");
const { configureRoutes } = require("./routes");
const { connectToDatabase } = require('./database');

//Sequelize instance connection

connectToDatabase();

const apiRoutes = express.Router();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

configureExpressMiddleware(app);
app.use('/api/v1', apiRoutes);
configureRoutes(apiRoutes);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

configureExpressMiddleware(app);
app.use("/api", apiRoutes);``
configureRoutes(apiRoutes);

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("SIGTERM", (err) => {
  console.log(err);
});

const port = process.env.PORT || 5051;
app.listen(port, () => {
  console.log(`Value for process.env.NODE_ENV: ${ process.env.NODE_ENV }`);
  console.log(`Value for process.env.PORT: ${ process.env.PORT }`);
  console.log(`Server is listening on port ${ port }`);
});

module.exports = app;
