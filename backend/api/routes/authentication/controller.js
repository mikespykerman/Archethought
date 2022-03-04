//'use strict';
const httpStatus = require('http-status');
const { respondWithError } = require("../../lib/request");
const AuthService = require('../../services/authentication');
const SendgridService = require('../../services/sendgrid');
const TokenService = require('../../services/token');
const MailgunService = require('../../services/mailgun');

const AuthenticationController = {
  async login(req, res, next) {
    try {
      const authService = new AuthService();
      const { user, token } = await authService.login(req.body);
      
      res.status(httpStatus.OK).json({
        token,
        user,
      });
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async logout (req, res, next) {
    try {
      const { user } = req;
      const logService = new LogService();
      await logService.logout(req, user);

      res.status(httpStatus.OK).send();
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async registerAccount (req, res, next) {
    try {
      const { user, account } = req.body;
      const authService = new AuthService();
      const payload = {
        account,
        user: {
          ...user,
          roles: [ROLES.owner],
          verified: false,
          status: STATUSES.USER.inactive,
        },
      };
      const result = await authService.registerAccount(payload);
      if(result){
        const sendgridService = new SendgridService();
        await sendgridService.sendRegistrationVerificationEmail(
          result.user,
          req.headers.origin
        );
        res.status(httpStatus.CREATED).send();
      }else{
        res.status(httpStatus.CREATED).send('Already Registered');
      }
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async confirmAccountRegistration (req, res, next) {
    try {
      const { token } = req.body;
      const authService = new AuthService();
      const result = await authService.verifyAccountRegistration(token);
      res.json(result);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async registerAdministrator (req, res, next) {
    try {
      const { user} = req.body;
      const authService = new AuthService();
      const payload = {
        user: {
          ...user,
          roles: [ROLES.admin],
          verified: true,
          status: STATUSES.USER.active,
        },
      };
      const result = await authService.registerAdministrator(payload);
      // console.log(result)

      // const sendgridService = new SendgridService();
      // await sendgridService.sendRegistrationVerificationEmail(
      //   result.user,
      //   req.headers.origin
      // );

      res.status(httpStatus.CREATED).send();
    } catch (err) {
      next(err);
    }
  },

  async registerUser (req, res) {
    try {
      const authService = new AuthService();
      const result = await authService.registerUser(req.body);
      res.status(httpStatus.CREATED).send(result);
    } catch (err) {
      respondWithError(res, err);
    }
  },

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body
      const tokenService = new TokenService();
      const token = await tokenService.generateToken(email);
      const mailgunService = new MailgunService()
      await mailgunService.resetPasswword(token);
      res.status(httpStatus.OK).send({ message: 'An email to reset the password has been sent.'});
    } catch(err) {
      console.log(err);
      respondWithError(res, err);
    }
  },

  async getToken(req, res) {
    try {
      const tokenService = new TokenService();
      const response = await tokenService.getToken(req.body);
      if (response.length === 0) {
        res.status(httpStatus.OK).send({ result: 'error', message: 'Invalid token' });
      } else {
        res.status(httpStatus.OK).send({ result: 'success', message: 'Valid token', token: response.token });
      }
    } catch(err) {
      respondWithError(res, err);
    }
  },

  async resetPassword(req, res) {
    try {
      const { id, token, newPassword} = req.body
      const authService = new AuthService();
      await authService.resetPassword(id, token, newPassword);
      res.status(httpStatus.OK).send({ result: 'success', message: 'Password was reset' });
    } catch(err) {
      respondWithError(res, err);
    }
  }
};

module.exports = AuthenticationController;