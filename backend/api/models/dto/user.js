class UserDTO {
  constructor(options) {
    this.id = options.id;
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.fullName = options.firstName + ' ' + options.lastName;
    this.email = options.email;
    this.mobile = options.mobile;
  }
};

module.exports = UserDTO;