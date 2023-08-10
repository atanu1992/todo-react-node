const otherRoutesPath = __dirname;
const router = require('express').Router();

const users = require(otherRoutesPath + '/user');
const todos = require(otherRoutesPath + '/todo');

router.use('/user', users);
router.use('/todo', todos);

module.exports = router;
