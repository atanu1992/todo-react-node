const {
  sequelize,
  Sequelize,
  DataTypes,
} = require('../middlewares/rdbms-database.js');
const { Users } = require('./users.model.js');

const Todos = sequelize.define(
  'todos',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    todo: {
      type: DataTypes.LONGTEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'id',
      references: {
        model: Users,
        key: 'id',
      },
      onDelete: 'CASCADE', // Add ON DELETE CASCADE option
      onUpdate: 'CASCADE', // Add ON UPDATE CASCADE option
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = { Todos };
