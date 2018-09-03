const Joi = require("joi");

function Event(title, description, date, time, location) {
  this.title = title;
  this.description = description;
  this.date = date;
  this.time = time;
  this.location = location;
}

Event.prototype.validate = function() {
  // Schema to validate
  const schema = {
    title: Joi.string().required(),
    description: Joi.string()
      .required()
      .max(256),
    date: Joi.date().required(),
    time: Joi.string().required(),
    location: Joi.string().required()
  };

  const result = Joi.validate(this, schema);
  return result;
};

module.exports = Event;
