const router = require('express').Router();
const TodoController = require('../components/todos/todo.controller');
const { verifyToken } = require('../middlewares/auth');

router.post('/add', verifyToken, TodoController.addTodo);
router.get('/:id', TodoController.getTodoById);
module.exports = router;
