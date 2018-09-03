// Application User constructor
function User(firstName, lastName, gender, phone, dob, address, password) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.phone = phone;
  this.dateOfBirth = dob;
  this.address = address;
  this.password = password;
}

module.exports = User;
