const { generateEncryptedCode } = require('../../middlewares/bcrypt');
const {
  addUserValidationSchema,
  userLoginValidationSchema,
} = require('../../utils/validations/users.validation');
const { addNewUserService, loginDetailsService } = require('./user.service');

exports.addUser = async (req, res, next) => {
  try {
    const { value, errors } = addUserValidationSchema(req.body);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    let encryptPassword = await generateEncryptedCode(value.password);
    value.password = encryptPassword;
    const newUsers = await addNewUserService(value);
    return res.json({ status: true, details: newUsers });
  } catch (error) {
    let err = error.message
      ? error.message
      : 'Something went wrong. Please try again later';
    return res.status(400).json({ status: false, error: err });
  }
};

exports.loginDetails = async (req, res, next) => {
  try {
    const { value, errors } = userLoginValidationSchema(req.body);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    const details = await loginDetailsService(value);
    return res.json({ status: true, details: details });
  } catch (error) {
    let err = error.message
      ? error.message
      : 'Something went wrong. Please try again later';
    return res.status(400).json({ status: false, error: err });
  }
};

exports.getUserById = (req, res, next) => {
  res.json({ status: 'hello world' });
};
