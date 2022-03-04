class CurriculumDTO {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
  }
};

module.exports = CurriculumDTO;