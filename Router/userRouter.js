const express = require('express');
const router = express.Router();

const userController = require('../Service/userService.js');

router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

router.get('/checkDuplicatedId/:id', userController.checkDuplicatedId);

/**
 * @swagger
 *  /product:
 *    get:
 *      tags:
 *      - product
 *      description: 모든 제품 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: category
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 */
router.post('/signIn', userController.signIn);

router.post('/signUp', userController.signUp);

module.exports = router;