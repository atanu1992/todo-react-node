const { Todos } = require('../../models/todos.model');

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
    const remove = await Todos.update(
      { status: 'N' },
      {
        where: {
          id: id,
        },
      }
    );
    console.log('remove ', remove);
    return remove;
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
    const changeCompleteStatus = await Todos.update(
      { status: status },
      {
        where: {
          id: id,
        },
      }
    );
    return changeCompleteStatus;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  addNewTodoService,
  todoDetailsByIdService,
  removeTodoService,
  toggleCompleteService,
};
