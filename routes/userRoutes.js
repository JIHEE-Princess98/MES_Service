const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

router.get('/users', userController.getUsers);
router.post('/user/insert', userController.createUser);

module.exports = router;