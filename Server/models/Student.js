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

// Student constructor
function Student(firstName, lastName, gender, phone, dob, address, password) {
  User.call(this, firstName, lastName, gender, phone, dob, address, password);
}

// Validate the students properties
Student.prototype.validate = function() {
  return true;
};

// Export the student
module.exports = Student;
