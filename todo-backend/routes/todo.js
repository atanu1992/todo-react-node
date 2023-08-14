const router = require('express').Router();
const TodoController = require('../components/todos/todo.controller');

router.post('/add', TodoController.addTodo);
router.get('/:id', TodoController.getTodoById);
router.patch(
  '/update-complete-status/:id',
  TodoController.updateCompleteStatus
);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.removeTodo);
module.exports = router;
