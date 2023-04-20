const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')

// Routes to Register
router.get('/register', userController.renderRegisterForm);

router.post('/register', userController.register);

//Routes to LogIn
router.get('/login', userController.renderLoginForm);
router.post('/login', userController.login);

router.get('/logOut', userController.logOut);

module.exports = router;