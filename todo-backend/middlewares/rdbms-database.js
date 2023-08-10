require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.RDMS_DBNAME,
  process.env.RDMS_USER,
  process.env.RDMS_PASSWORD,
  {
    host: process.env.RDMS_HOST,
    dialect: 'mariadb',
    logging: false,
    pool: {
      max: 100, // Set the maximum number of connections in the pool
      min: 0, // Set the minimum number of connections in the pool
      acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released
      idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
    },
  }
);

async function connectRdbmsDB() {
  try {
    await sequelize.authenticate();
    console.log('RDMS Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the RDMS database.');
    throw new Error(error);
  }
}

module.exports = { connectRdbmsDB, sequelize, Sequelize, DataTypes };
