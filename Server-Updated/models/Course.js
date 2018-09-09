const Joi = require('joi');

// The course model
class Course {
  constructor(title, description, duration, level, maximumStudents) {
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.level = level;
    this.maximumStudents = maximumStudents;
    this.dateStarted = new Date()
  }

  // Validate the model
  validate() {
    const schema = {
      title: Joi.string().min(3).max(64).required(),
      description: Joi.string().max(256).required(),
      duration: Joi.number().min(1).max(96).required(),
      level: Joi.string().only('Basics', 'Intermediate', 'Advanced').required(),
      maximumStudents: Joi.number().min(1).max(5000).required(),
      dateStarted: Joi.date().required()
    }

    const errors = Joi.validate(this, schema);
    return errors;
  }
}

// Export the model
module.exports = Course;