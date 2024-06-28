const express = require('express');
const router = express.Router();

const userController = require('../Service/userService.js');

router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

// router.post('/signIn', userController.login);
router.post('/signUp', userController.postCreateUser);

module.exports = router;