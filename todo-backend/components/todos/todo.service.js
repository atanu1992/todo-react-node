const { Todos } = require('../../models/todos.model');

/**
 * List all todos
 * @return array
 */
const getAllTodos = async (userId) => {
  try {
    const roles = await Todos.findAll({
      where: {
        status: 'Y',
        userId: userId,
      },
      order: [['id', 'DESC']],
    });
    let rolesData = Object.keys(roles).length
      ? roles.map((role) => role.toJSON())
      : [];
    return rolesData;
    return;
  } catch (error) {
    throw error;
  }
};

/**
 * Add new todo
 * @param {data} object
 * @returns object
 */
const addNewTodoService = async (data) => {
  try {
    const newTodo = await Todos.create(data);
    const newTodoDetails = newTodo ? newTodo.toJSON() : undefined;
    if (!newTodoDetails) {
      throw Error('Failed to add new todo');
    }
    return newTodoDetails;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Fetch todo details by todo id
 * @param id string
 * @returns object
 */
const todoDetailsByIdService = async (id) => {
  try {
    const todo = await Todos.findByPk(id);
    const todoDetails = todo ? todo.toJSON() : undefined;
    if (!todoDetails) {
      throw Error('No record found');
    }
    return todoDetails;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Remove todo task
 * @param {id} integer
 * @returns boolean
 */
const removeTodoService = async (id) => {
  try {
    const [remove] = await Todos.update(
      { status: 'N' },
      {
        where: {
          id: id,
        },
      }
    );
    return remove ? true : false;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * update todo complete status
 * @param {id} integer
 * @param {status} string ('Y','N')
 * @returns boolean
 */
const toggleCompleteService = async (id, status) => {
  try {
    const [changeCompleteStatus] = await Todos.update(
      { completed: status },
      {
        where: {
          id: id,
        },
      }
    );
    return changeCompleteStatus ? true : false;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Update todo by todo id
 * @param {id} integer
 * @param {todoText} string
 * @returns boolean
 */
const updateTodo = async (id, details) => {
  try {
    const [updateTodo] = await Todos.update(
      { todoText: details.todoText },
      {
        where: {
          id: id,
        },
      }
    );
    return updateTodo ? true : false;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getAllTodos,
  addNewTodoService,
  todoDetailsByIdService,
  removeTodoService,
  toggleCompleteService,
  updateTodo,
};
