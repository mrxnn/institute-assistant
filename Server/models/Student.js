const Joi = require("joi");

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
  // Schema to validate
  const schema = {
    firstName: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .min(3)
      .required(),
    gender: Joi.string()
      .only("M", "F")
      .required(),
    phone: Joi.string()
      .min(10)
      .max(10)
      .required(),
    dateOfBirth: Joi.date().required(),
    address: Joi.string()
      .max(256)
      .required(),
    password: Joi.string().optional()
  };

  const result = Joi.validate(this, schema);
  return result;
};

// Export the student
module.exports = Student;
