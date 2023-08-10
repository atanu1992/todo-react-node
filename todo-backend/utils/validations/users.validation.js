const {
  Joi,
  joiOptions,
  errorsFormatter,
  sanitizeUserInput,
} = require('../../middlewares/validation-and-sanitisation');

const addUserValidationSchema = (userInput) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).max(12).required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = schema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

const userIdValidationSchema = (userInput) => {
  const idSchema = Joi.object({
    id: Joi.string().alphanum().trim().required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = idSchema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

const updateRoleValidationSchema = (userInput, id) => {
  const schema = Joi.object({
    roleName: Joi.string().trim().required(),
    id: Joi.string().alphanum().trim().required(),
  });
  userInput = sanitizeUserInput(userInput);
  const { error, value } = schema.validate(userInput, joiOptions);
  if (error) {
    return errorsFormatter(error);
  }
  return { value: userInput };
};

module.exports = {
  addUserValidationSchema,
  userIdValidationSchema,
};
