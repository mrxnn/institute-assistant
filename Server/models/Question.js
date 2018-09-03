const Joi = require("joi");

function Question(content, postedUserId, postedTime) {
  this.content = content;
  this.postedUserId = postedUserId;
  this.postedTime = postedTime;
}

Question.prototype.validate = function() {
  // Schema to validate
  const schema = {
    content: Joi.string()
      .max(512)
      .required(),
    postedUserId: Joi.number().required()
  };

  const result = Joi.validate(this, schema);
  return result;
};

module.exports = Question;
