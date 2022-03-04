const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../models/dto/error");

let Guard = {
  // Middleware to require authentication
  auth: async (req, res, next) => {
    if (!req.headers.authorization) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({
          error: new ApiError(
            httpStatus.UNAUTHORIZED,
            "Authorization headers not present"
          ),
        });
    }
    return passport.authenticate(
      "jwt",
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          return res.status(httpStatus.UNAUTHORIZED).send({ error: err });
        }

        if (info && req.method !== "OPTIONS") {
          const description =
            info.name === "TokenExpiredError" ? "Token Expired" : info.message;
          return res.status(httpStatus.BAD_REQUEST).send({
            error: new ApiError(httpStatus.UNAUTHORIZED, description),
          });
        }

        if (passportUser) {
          req.user = passportUser;
        }

        return next(null, passportUser);
      }
    )(req, res, next);
  },

  // Middleware to role based permissions
  checkRoles: (checkingRoles = []) => {
    return function (req, res, next) {
      if (
        req.method === "OPTIONS" ||
        req.user.roles.some((r) => checkingRoles.includes(r))
      ) {
        next();
      } else {
        const error = new ApiError(
          httpStatus.FORBIDDEN,
          "User does not have access permissions"
        );

        res.status(httpStatus.FORBIDDEN).send({ error });
      }
    };
  },
};

module.exports = Guard;