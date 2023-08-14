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
  getAllTodos,
} = require('./todo.service');

/**
 * List of todos
 */
exports.getTodos = async (req, res, next) => {
  try {
    const { userId } = req;
    const allRoles = await getAllTodos(userId)
      .then((result) => {
        return res.status(200).send({ status: true, details: result });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    next(error);
  }
};

/** Add new todo */
exports.addTodo = async (req, res, next) => {
  try {
    const { userId } = req;
    const { value, errors } = addTodoValidationSchema(req.body);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    value.userId = userId;
    const newTodo = await addNewTodoService(value);
    if (!newTodo) {
      throw Error('Failed to add todo.');
    }
    return res.status(201).json({ status: true, details: newTodo });
  } catch (error) {
    next(error);
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
    next(error);
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
    const isUpdated = await updateTodo(id, otherDetails);
    if (isUpdated) {
      const todoDetailsById = await todoDetailsByIdService(id);
      return res.json({
        status: isUpdated,
        details: todoDetailsById,
      });
    }
    return res.json({
      status: isUpdated,
    });
  } catch (error) {
    next(error);
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
    const isUpdated = await toggleCompleteService(id, otherDetails.completed);
    if (isUpdated) {
      const todoDetailsById = await todoDetailsByIdService(id);
      return res.json({
        status: isUpdated,
        details: todoDetailsById,
      });
    }
    return res.json({
      status: isUpdated,
    });
  } catch (error) {
    next(error);
  }
};

/** remove todo details by todo id */
exports.removeTodo = async (req, res, next) => {
  try {
    const { value, errors } = todoIdValidationSchema(req.params);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    const update = await removeTodoService(value.id);
    if (!update) {
      throw Error('No records found.');
    }
    return res.json({
      status: update,
    });
  } catch (error) {
    next(error);
  }
};
