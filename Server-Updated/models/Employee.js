const Joi = require('joi');

// Employee model
class Employee {
  constructor(firstName, lastName, gender, nic, dateOfBirth, phone, email, location, bio, type, post) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.nic = nic;
    this.dateOfBirth = dateOfBirth;
    this.phone = phone;
    this.email = email;
    this.location = location;
    this.bio = bio;
    this.type = type;
    this.post = post;
  }

  /**
   * Validate the data in this object against the schema,
   * returns true if the object state is valid, and false otherwise
   */
  validate() {
    const schema = {
      firstName: Joi.string().min(3).max(64).required(),
      lastName: Joi.string().min(3).max(64).required(),
      gender: Joi.string().min(1).max(1).only('M', 'F').required(),
      nic: Joi.string().min(10).max(12).required(),
      dateOfBirth: Joi.date().required(),
      phone: Joi.string().min(10).max(10).required(),
      email: Joi.string().email().optional().max(64),
      location: Joi.string().min(3).max(256).required(),
      bio: Joi.string().allow(''),
      type: Joi.string().only('Academic', 'Non-Academic').required(),
      post: Joi.string().min(3).max(64).required()
    }

    const errors = Joi.validate(this, schema);
    return errors;
  }
}

// export the Employee model
module.exports = Employee;
