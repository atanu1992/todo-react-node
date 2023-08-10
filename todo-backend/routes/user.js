const router = require('express').Router();
const UserController = require('../components/users/user.controller');

router.post('/add', UserController.addUser);
router.get('/:id', UserController.getUserById);
module.exports = router;
