const AccountRepository = require('../database/accountRepository');
const AccountDTO = require('../models/dto/account');
const ErrorService = require('./error');

/**
 * Account Service
 */
class AccountService {
  constructor() {
    this._accountRepository = new AccountRepository();
  }
  /**
   * Get all account
   * @returns {Promise<AccountDTO>}
   */
  async getAll(){
    const { accounts, total } = await this._accountRepository.getAll();
    return { 
      data: accounts.map((a) => new AccountDTO(a)),
      meta: {
        page: 1,
        limit: 25,
        total
      }
    };
  }
  /**
   * Create account
   * @param {object} payload - Object to create new account
   * @returns {Promise<AccountDTO}
   */
  async createAccount(payload) {
    const newAccount = await this._accountRepository.create(payload);
    if (!newAccount) {
      ErrorService.THROW_BAD_REQUEST("Unable to create account.");
    }
    return new AccountDTO(newAccount);
  }
  /**
   * Retrieve account
   * @param {string} id - Account id
   * @returns {Promise<AccountDTO>}
   */
  async retrieveAccount(id) {
    const account = await this._accountRepository.getById(id);
    if (!account) {
      ErrorService.THROW_BAD_REQUEST("Unable to retrieve account.");
    }

    return new AccountDTO(account);
  }
  /**
   * Update account
   * @param {string} id - Account id
   * @param {object} payload - Object to update account
   * @throws {THROW_BAD_REQUEST} - Unable to update account
   * @returns {Promise<AccountDTO>}
   */
  async updateAccount(id, payload) {
    let accountId = id;
    let account = await this._accountRepository.getById(id);
    
    if (!account) {
      ErrorService.THROW_BAD_REQUEST("Unable to update account.");
    }
    const update = await this._accountRepository.update(accountId, { name: payload.name });
    
    if (!update) {
      ErrorService.THROW_BAD_REQUEST("Unable to update account.");
    }

    return new AccountDTO(update);
  }
  /**
   * Delete account
   * @param {string} id - Account id
   * @throws {THROW_BAD_REQUEST} - Unable to delete account
   * @returns {Promise<AccountDTO>}
   */
  async deleteAccount(id) {
    let account = await this._accountRepository.getById(id);
    
    if (!account) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete account.");
    }

    const res = this._accountRepository.delete(id);
    if (!res) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete account.");
    }

    return new AccountDTO(res);
  }
}

module.exports = AccountService;