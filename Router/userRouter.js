const express = require('express');
const router = express.Router();

const userController = require('../Service/userService.js');

router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

router.post('/signIn', userController.signIn);
router.post('/signUp', userController.signUp);

module.exports = router;