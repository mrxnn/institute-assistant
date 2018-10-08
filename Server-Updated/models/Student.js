const Joi = require('joi');

// Student model
class Student {
  constructor(firstName, lastName, gender, nic, dateOfBirth, phone, email, location, bio) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.nic = nic;
    this.dateOfBirth = dateOfBirth;
    this.phone = phone;
    this.email = email;
    this.location = location;
    this.bio = bio;
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
      bio: Joi.string().allow('')
    }

    const errors = Joi.validate(this, schema);
    return errors;
  }

  // Set the password for this student
  setPassword(password) {
    this.password = password;
  }
}

// export the Student model
module.exports = Student;
