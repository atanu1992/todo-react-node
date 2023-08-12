const { createToken } = require('../../middlewares/auth');
const { verifyEncryptedCode } = require('../../middlewares/bcrypt');
const { Users, sequelize, Sequelize } = require('../../models/users.model');

/**
 * Add new user by checking email exists or not
 * @param {data} object
 * @returns object
 */
const addNewUserService = async (data) => {
  try {
    // check email exists
    const checkEmailExist = await Users.findOne({
      where: { email: data.email },
    });
    if (checkEmailExist?.toJSON()) {
      throw `${data.email} already exists`;
    }
    // add new user
    const newUser = await Users.create(data);
    const newUserDetails = newUser ? newUser.toJSON() : undefined;
    if (!newUserDetails) {
      throw 'Failed to add user';
    }
    const { id, password, ...details } = newUserDetails;
    return details;
  } catch (error) {
    throw Error(error);
  }
};

const loginDetailsService = async (data) => {
  try {
    let { email, password } = data;
    const details = await Users.findOne({ where: { email: email } });
    const currentUser = details ? details.toJSON() : undefined;
    if (!currentUser) {
      throw 'Invalid user';
    }
    if (!(await verifyEncryptedCode(password, currentUser.password))) {
      throw 'Invalid credentials';
    }
    const token = createToken(currentUser);
    return { user: { name: currentUser.name }, token: token };
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  addNewUserService,
  loginDetailsService,
};
