const express = require('express');
const router = express.Router();

const fundingController = require('../Service/fundingService.js');

router.get('/', (req, res, next) => {
    console.log(" default endpoint - fundingController");
});


/**
 * @swagger
 *  /funding/create:
 *    post:
 *      tags: [funding]
 *      description: 펀딩 게시물을 등록합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/raw:
 *          schema:
 *            type: json
 *            properties:
 *              id:
 *                type: integer
 *                description: "유저 고유아이디"
 *              name:
 *                type: string
 *                description: "유저 이름"
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 펀딩 생성 성공
 */
router.post('/create', fundingController.createFunding);

module.exports = router;