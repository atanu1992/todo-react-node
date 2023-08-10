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
    todoText: {
      field: 'todo_text',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    completed: {
      type: DataTypes.ENUM,
      allowNull: false,
      field: 'is_completed',
      values: ['Y', 'N'],
      defaultValue: 'N',
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
      onDelete: 'CASCADE', // Add ON DELETE CASCADE option
      onUpdate: 'CASCADE', // Add ON UPDATE CASCADE option
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      field: 'status',
      values: ['Y', 'N'],
      defaultValue: 'Y',
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = { Todos };
