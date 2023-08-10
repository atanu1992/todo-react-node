const router = require('express').Router();
const TodoController = require('../components/todos/todo.controller');
const { verifyToken } = require('../middlewares/auth');

router.post('/add', verifyToken, TodoController.addTodo);
router.get('/:id', verifyToken, TodoController.getTodoById);
router.patch(
  '/update-complete-status/:id',
  verifyToken,
  TodoController.updateCompleteStatus
);
router.put('/:id', verifyToken, TodoController.updateTodo);
router.delete('/:id', verifyToken, TodoController.removeTodo);
module.exports = router;
