const { generateEncryptedCode } = require('../../middlewares/bcrypt');
const {
  addTodoValidationSchema,
  todoIdValidationSchema,
  todoCompleteStatusChangeSchema,
  updateTodoSchema,
} = require('../../utils/validations/todos.validation');
const {
  addNewTodoService,
  todoDetailsByIdService,
  toggleCompleteService,
  updateTodo,
  removeTodoService,
} = require('./todo.service');

/** Add new todo */
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

/** Get todo details by todo id */
exports.getTodoById = async (req, res, next) => {
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

exports.updateTodo = async (req, res, next) => {
  try {
    let data = { ...req.body, ...req.params };
    const { value, errors } = updateTodoSchema(data);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }

    const { id, ...otherDetails } = value;
    const todoDetails = await updateTodo(id, otherDetails);
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

/** Get todo details by todo id */
exports.updateCompleteStatus = async (req, res, next) => {
  try {
    let data = { ...req.body, ...req.params };
    const { value, errors } = todoCompleteStatusChangeSchema(data);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }

    const { id, ...otherDetails } = value;
    const todoDetails = await toggleCompleteService(id, otherDetails);
    return res.json({
      status: todoDetails,
    });
  } catch (error) {
    let err = error.message
      ? error.message
      : 'Something went wrong. Please try again later';
    return res.status(400).json({ status: false, error: err });
  }
};

/** remove todo details by todo id */
exports.removeTodo = async (req, res, next) => {
  try {
    const { value, errors } = todoIdValidationSchema(req.params);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    const todoDetails = await removeTodoService(value.id);
    if (!todoDetails) {
      throw Error('No records found.');
    }
    return res.json({
      status: todoDetails,
    });
  } catch (error) {
    let err = error.message
      ? error.message
      : 'Something went wrong. Please try again later';
    return res.status(400).json({ status: false, error: err });
  }
};
