const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiVersion = require('../../package.json').version;
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');

function configureExpressMiddleware(app) {
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use((req, res, next) => {
    res.setHeader('Version', apiVersion);
    next();
  });
  app.use(
    cors({
      origin: '*',
    })
  );
  // app.use(passport.initialize());
  // app.use(passport.session());
}

module.exports = {
  configureExpressMiddleware,
};