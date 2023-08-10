const router = require('express').Router();
const UserController = require('../components/users/user.controller');

router.post('/add', UserController.addUser);
router.get('/:id', UserController.getUserById);
router.post('/login', UserController.loginDetails);

module.exports = router;
