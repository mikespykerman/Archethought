const TestingRepository = require('../database/testingRepository');
const TestDTO = require('../models/dto/test');
const ErrorService = require('./error');

/**
 * Testing Service
 */
class TestingService {
  constructor() {
    this._testingRepository = new TestingRepository();
  }

  async getAll() {
    const { tests, total } = await this._testingRepository.getAll();
    return { 
      data: tests.map((a) => new TestDTO(a)),
      meta: {
        page: 1,
        limit: 25,
        total
      }
    };
  }
    /**
   * Get test by id
   * @param {string} id - Test id
   * @returns {Promise<TestDTO>}
   */
  async retrieveTest(id) {
    const test = await this._testingRepository.getById(id);
    if (!test) {
      ErrorService.THROW_BAD_REQUEST("Unable to retrieve test.");
    }

    return new TestDTO(test);
  }

  /**
   * Create test
   * @param {object} payload - Object to create test
   * @returns {Promise<TestDTO>}
   */
  async createTest(payload) {
    const test = await this._testingRepository.create(payload);
    return new TestDTO(test);
  }
  /**
   * Update test
   * @param {string} id - Test id
   * @param {object} payload - Object to update test
   * @returns {Promise<TestDTO>}
   */
  async updateTest(id, payload) {
    let test = await this._testingRepository.getById(id);
    
    if (!test) {
      ErrorService.THROW_BAD_REQUEST("Unable to update test.");
    }
    const update = await this._testingRepository.update(id, { name: payload.name });
    
    if (!update) {
      ErrorService.THROW_BAD_REQUEST("Unable to update test.");
    }

    return new TestDTO(update);
  }
  /**
   * Delete test
   * @param {string} id - Test id
   * @returns {Promise<TestDTO>}
   */
  async deleteTest(id) {
    let test = await this._testingRepository.getById(id);
      
    if (!test) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete test.");
    }
  
    const res = this._testingRepository.delete(id);
    if (!res) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete test.");
    }
  
    return new TestDTO(res);
  }
}

module.exports = TestingService;