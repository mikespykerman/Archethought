class TestDTO {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.user = options.userId;
    this.result = options.result;
    this.status = options.status;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
  }
};

module.exports = TestDTO;