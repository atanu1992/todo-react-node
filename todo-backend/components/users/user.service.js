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
      throw Error(`${data.email} already exists`);
    }
    // add new user
    const newUser = await Users.create(data);
    const newUserDetails = newUser.toJSON();
    const { id, password, ...details } = newUserDetails;
    return details;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Fetch user details by user unique id
 * @param id string
 * @returns object
 */
const userDetailsByIdService = async (id) => {
  try {
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  addNewUserService,
  userDetailsByIdService,
};
