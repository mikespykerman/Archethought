const AccountRepository = require('../database/accountRepository');
const UserRepository = require('../database/userRepository');
const { getAccountInfo } = require('../lib/request');
const { generateToken } = require('../lib/jwt');
const AuthUserDTO = require('../models/dto/authUser');
const ErrorService = require('./error');

/**
 * Authentication Service
 */
class AuthenticationService {
  constructor() {
    /** @constructs */
    this._accountRepository = new AccountRepository();
    this._userRepository = new UserRepository();
  }
  /**
   * Create user
   * @param {object} payload - Object to create user
   * @returns {Promise}
   */
  async registerUser(payload) {
    const { email } = payload;

    let user = await this._userRepository.getByEmail(email);
      
    if(user) {
      ErrorService.THROW_BAD_REQUEST("User already exists.");
    }
      
    const newUser = await this._userRepository.create(payload);
    return new AuthUserDTO(newUser);
  }
  /**
   * Login as a user
   * @param {string} email - Email address
   * @param {string} password - Password
   * @returns {Promise<AuthUserDTO>}
   */
  async login({ email, password }) {
      let user = await this._userRepository.getByEmail(email);

      if (!user) {
        ErrorService.THROW_BAD_REQUEST(
          'Your login details could not be verified. Please try again.'
        );
      }
  
      const isMatched = await user.isPasswordValid(password);
  
      if (!isMatched) {
        ErrorService.THROW_BAD_REQUEST(
          'Your login details could not be verified. Please try again.'
        );
      }
  
      const token = generateToken(getAccountInfo(user));

      return { user: new AuthUserDTO(user), token };
  }
}

module.exports = AuthenticationService;