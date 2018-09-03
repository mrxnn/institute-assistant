const Joi = require("joi");

function Answer(content, answeredUserId, postedTime, questionId) {
  this.content = content;
  this.answeredUserId = answeredUserId;
  this.postedTime = postedTime;
  this.questionId = questionId;
}

Answer.prototype.validate = function() {
  // Schema to validate
  const schema = {
    content: Joi.string()
      .max(512)
      .required(),
    answeredUserId: Joi.number().required(),
    questionId: Joi.number().required()
  };

  const result = Joi.validate(this, schema);
  return result;
};

module.exports = Answer;
