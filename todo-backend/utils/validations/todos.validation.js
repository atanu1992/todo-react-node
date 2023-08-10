const {
  Joi,
  joiOptions,
  errorsFormatter,
  sanitizeUserInput,
} = require('../../middlewares/validation-and-sanitisation');

const addTodoValidationSchema = (userInput) => {
  const schema = Joi.object({
    todoText: Joi.string().trim().required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = schema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

const todoIdValidationSchema = (userInput) => {
  const idSchema = Joi.object({
    id: Joi.number().required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = idSchema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

const todoCompleteStatusChangeSchema = (userInput) => {
  const schema = Joi.object({
    completed: Joi.string().trim().required().valid('Y', 'N'),
    id: Joi.number().required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = schema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

const updateTodoSchema = (userInput) => {
  const schema = Joi.object({
    todoText: Joi.string().trim().required(),
    id: Joi.number().required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = schema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

module.exports = {
  addTodoValidationSchema,
  todoIdValidationSchema,
  todoCompleteStatusChangeSchema,
  updateTodoSchema,
};
