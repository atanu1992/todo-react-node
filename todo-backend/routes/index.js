const otherRoutesPath = __dirname;
const router = require('express').Router();

const { getTodos } = require('../components/todos/todo.controller');
const { verifyToken } = require('../middlewares/auth');

const users = require(otherRoutesPath + '/user');
const todos = require(otherRoutesPath + '/todo');

router.use('/user', users);
router.use('/todo', verifyToken, todos);

// all todos
router.use('/todos', verifyToken, getTodos);

module.exports = router;
