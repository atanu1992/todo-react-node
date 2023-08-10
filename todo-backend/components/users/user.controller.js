const { generateEncryptedCode } = require('../../middlewares/bcrypt');
const {
  addUserValidationSchema,
} = require('../../utils/validations/users.validation');
const { addNewUserService } = require('./user.service');

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

exports.getUserById = (req, res, next) => {
  res.json({ status: 'hello world' });
};
