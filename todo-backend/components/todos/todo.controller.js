const { generateEncryptedCode } = require('../../middlewares/bcrypt');
const {
  addTodoValidationSchema,
  todoIdValidationSchema,
} = require('../../utils/validations/todos.validation');
const { addNewTodoService, todoDetailsByIdService } = require('./todo.service');

exports.addTodo = async (req, res, next) => {
  try {
    const { value, errors } = addTodoValidationSchema(req.body);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    const newTodo = await addNewTodoService(value);
    if (!newTodo) {
      throw Error('Failed to add todo.');
    }
    return res.json({ status: true, details: newTodo });
  } catch (error) {
    let err = error.message
      ? error.message
      : 'Something went wrong. Please try again later';
    return res.status(400).json({ status: false, error: err });
  }
};

exports.getTodoById = async (req, res, next) => {
  console.log('dddd', req.params);
  try {
    const { value, errors } = todoIdValidationSchema(req.params);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }

    const todoDetails = await todoDetailsByIdService(value.id);
    if (!todoDetails) {
      throw Error('No records found.');
    }
    return res.json({
      status: true,
      details: todoDetails,
    });
  } catch (error) {
    let err = error.message
      ? error.message
      : 'Something went wrong. Please try again later';
    return res.status(400).json({ status: false, error: err });
  }
};
