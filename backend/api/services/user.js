const UserRepository = require('../database/userRepository');
const UserDTO = require('../models/dto/user');
const ErrorService = require('./error');

/**
 * User Service
 */
class UserService {
  constructor() {
    this._userRepository = new UserRepository();
  }

  async getAll() {
    const { users, total } = await this._userRepository.getAll();
    return { 
      data: users.map((a) => new UserDTO(a)),
      meta: {
        page: 1,
        limit: 25,
        total
      }
    };
  }
    /**
   * Get user by id
   * @param {string} id - User id
   * @returns {Promise<UserDTO>}
   */
  async getUser(id) {
    const user = await this._userRepository.getById(id);
    if (!user) {
      ErrorService.THROW_BAD_REQUEST("Unable to retrieve user.");
    }

    return new UserDTO(user);
  }

  /**
   * Create user
   * @param {object} payload - Object to create user
   * @returns {Promise<UserDTO>}
   */
  async createUser(payload) {
    const user = await this._userRepository.create(payload);
    return new UserDTO(user);
  }
  /**
   * Update user
   * @param {string} id - User id
   * @param {object} payload - Object to update user
   * @returns {Promise<UserDTO>}
   */
  async updateUser(id, payload) {
    let user = await this._userRepository.getById(id);
    
    if (!user) {
      ErrorService.THROW_BAD_REQUEST("Unable to update user.");
    }
    const update = await this._userRepository.update(id, { name: payload.name });
    
    if (!update) {
      ErrorService.THROW_BAD_REQUEST("Unable to update user.");
    }

    return new UserDTO(update);
  }
  /**
   * Delete user
   * @param {string} id - User id
   * @returns {Promise<UserDTO>}
   */
  async deleteUser(id) {
    let user = await this._userRepository.getById(id);
      
    if (!user) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete user.");
    }
  
    const res = this._userRepository.delete(id);
    if (!res) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete user.");
    }
  
    return new UserDTO(res);
  }
}

module.exports = UserService;