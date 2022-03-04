const Curriculum = require('../../models').Curriculum;

class CurriculumRepository {
  async getAll() {
    const curriculums = await Curriculum.findAll({ raw: true });
    return { curriculums, total: 1 };
  }

  async getById(id) {
    const curriculum = await Curriculum.findByPk(id);
    return curriculum;
  }
  
  async create(payload) {
    const curriculum = await Curriculum.create(payload);
    return curriculum;
  }

  async update(id, payload) {
    const curriculum = await Curriculum.update(payload, { where: { id: id }, returning: true, raw: true });
    return curriculum[1][0];
  }

  async delete(id) {
    const curriculum = await Curriculum.destroy({ where: { id: id }});
    return curriculum;
  }
}

module.exports = CurriculumRepository;