const Joi = require("joi");
const User = require("./User");

// Employee constructor
function Employee(
  firstName,
  lastName,
  gender,
  phone,
  dob,
  address,
  password,
  role,
  nic,
  post
) {
  User.call(this, firstName, lastName, gender, phone, dob, address, password);
  this.empRole = role;
  this.post = post;
  this.nic = nic;
}

// Validate the Employees properties
Employee.prototype.validate = function() {
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
    password: Joi.string().optional(),
    empRole: Joi.string()
      .only("Academic", "Non-Academic")
      .required(),
    post: Joi.string().required(),
    nic: Joi.string()
      .required()
      .min(10)
      .max(10)
  };

  const result = Joi.validate(this, schema);
  return result;
};

// Export the Employee
module.exports = Employee;
