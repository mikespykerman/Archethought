class AuthUserDTO {
  constructor(options) {
    this.id = options.id;
    this.fullName = options.firstName + ' ' + options.lastName;
    this.email = options.email;
  }
};

module.exports = AuthUserDTO;