const CurriculumRepository = require('../database/curriculumRepository');
const CurriculumDTO = require('../models/dto/curriculum');
const ErrorService = require('./error');

/**
 * Curriculum Service
 */
class CurriculumService {
  constructor() {
    this._curriculumRepository = new CurriculumRepository();
  }

  async getAll() {
    const { curriculums, total } = await this._curriculumRepository.getAll();
    return { 
      data: curriculums.map((a) => new CurriculumDTO(a)),
      meta: {
        page: 1,
        limit: 25,
        total
      }
    };
  }
    /**
   * Get curriculum by id
   * @param {string} id - Curriculum id
   * @returns {Promise<CurriculumDTO>}
   */
  async getCurriculum(id) {
    const curriculum = await this._curriculumRepository.getById(id);
    if (!curriculum) {
      ErrorService.THROW_BAD_REQUEST("Unable to retrieve curriculum.");
    }

    return new CurriculumDTO(curriculum);
  }

  /**
   * Create curriculum
   * @param {object} payload - Object to create curriculum
   * @returns {Promise<CurriculumDTO>}
   */
  async createCurriculum(payload) {
    const curriculum = await this._curriculumRepository.create(payload);

    if (!curriculum) {
      ErrorService.THROW_BAD_REQUEST("Unable to create curriculum.");
    }

    return new CurriculumDTO(curriculum);
  }
  /**
   * Update curriculum
   * @param {string} id - Curriculum id
   * @param {object} payload - Object to update curriculum
   * @returns {Promise<CurriculumDTO>}
   */
  async updateCurriculum(id, payload) {
    let curriculum = await this._curriculumRepository.getById(id);
    
    if (!curriculum) {
      ErrorService.THROW_BAD_REQUEST("Unable to update curriculum.");
    }
    const update = await this._curriculumRepository.update(id, { name: payload.name });
    
    if (!update) {
      ErrorService.THROW_BAD_REQUEST("Unable to update curriculum.");
    }

    return new CurriculumDTO(update);
  }
  /**
   * Delete curriculum
   * @param {string} id - Curriculum id
   * @returns {Promise<CurriculumDTO>}
   */
  async deleteCurriculum(id) {
    let curriculum = await this._curriculumRepository.getById(id);
      
    if (!curriculum) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete curriculum.");
    }
  
    const res = this._curriculumRepository.delete(id);
    if (!res) {
      ErrorService.THROW_BAD_REQUEST("Unable to delete curriculum.");
    }
  
    return new CurriculumDTO(res);
  }
}

module.exports = CurriculumService;