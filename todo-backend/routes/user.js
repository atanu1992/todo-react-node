const router = require('express').Router();
const UserController = require('../components/users/user.controller');

router.post('/register', UserController.addUser);
router.post('/login', UserController.loginDetails);

module.exports = router;
