const Joi = require("joi");

function Book(title, description, author, publisher, status) {
  this.title = title;
  this.description = description;
  this.author = author;
  this.publisher = publisher;
  this.status = status;
}

Book.prototype.validate = function() {
  // Schema to validate
  const schema = {
    title: Joi.string().required(),
    description: Joi.string()
      .max(255)
      .required(),
    author: Joi.string().required(),
    publisher: Joi.string().required(),
    status: Joi.string().only("Available", "Issued")
  };

  const result = Joi.validate(this, schema);
  return result;
};

module.exports = Book;
