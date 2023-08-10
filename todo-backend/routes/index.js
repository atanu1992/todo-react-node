const otherRoutesPath = __dirname;
const router = require('express').Router();

const users = require(otherRoutesPath + '/user');
router.use('/user', users);

module.exports = router;
