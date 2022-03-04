class AccountDTO {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.created = options.createdAt;
    this.lastModified = options.updatedAt;
  }
};

module.exports = AccountDTO;