const express = require('express');
const router = express.Router();

const fundingController = require('../Service/fundingService.js');

router.get('/', (req, res, next) => {
	console.log(' default endpoint - fundingController');
});
/**
 * @swagger
 *  /funding/create:
 *    post:
 *      tags: [펀딩]
 *      summary: 펀딩 생성 API
 *      requestBody:
 *        description: "펀딩 정보 입력"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                      example: '선물 주세요'
 *                    item:
 *                      type: string
 *                      example: '맥북'
 *                    price:
 *                      type: number
 *                      example: 2300000
 *                    deadline:
 *                      type: timestamp
 *                      example: 2024-12-31
 *                    userId:
 *                      type: string
 *                      example: 'testid2'
 *                    image:
 *                      type: string
 *                      example: https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004
 *      responses:
 *        201:
 *          description: 펀딩 생성 성공
 *        500:
 *          description: 펀딩 생성 실패
 */
router.post('/create', fundingController.createFunding);

/**
 * @swagger
 *  /funding/viewList:
 *    post:
 *      tags: [펀딩]
 *      summary: 펀딩 조회 API
 *      requestBody:
 *        description: "사용자 아이디 입력"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    userId:
 *                      type: string
 *                      example: 'testid2'
 *      responses:
 *        200:
 *          description: 펀딩 리스트 조회 성공
 *        204:
 *          description: 사용자가 생성한 펀딩이 없는 경우
 *        400:
 *          description: 요청 바디에서 필수 필드인 userId가 없는 경우
 *        500:
 *          description: 펀딩 리스트 조회 실패
 */
router.post('/viewList', fundingController.viewListFunding);

/**
 * @swagger
 *  /funding/view:
 *    get:
 *      tags: [펀딩]
 *      summary: 펀딩 조회 API
 *      parameters:
 *        - in: query
 *          name: id
 *          required: true
 *          schema:
 *            type: number
 *            example: 15
 *          description: 조회할 펀딩 ID
 *      responses:
 *        200:
 *          description: 펀딩 리스트 조회 성공
 *        204:
 *          description: 사용자가 생성한 펀딩이 없는 경우
 *        400:
 *          description: 요청 바디에서 필수 필드인 id가 없는 경우
 *        500:
 *          description: 펀딩 리스트 조회 실패
 */

router.get('/view', fundingController.viewFunding);

/**
 * @swagger
 *  /funding/update:
 *    post:
 *      tags: [펀딩]
 *      summary: 펀딩 수정 API
 *      requestBody:
 *        description: "펀딩 수정 정보 입력"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 15
 *                    title:
 *                      type: string
 *                      example: '나 곧 생일인데...'
 *                    item:
 *                      type: string
 *                      example: '가방'
 *                    price:
 *                      type: number
 *                      example: 185000
 *                    deadline:
 *                      type: timestamp
 *                      example: 2024-9-30
 *                    userId:
 *                      type: string
 *                      example: 'testid2'
 *                    image:
 *                      type: string
 *                      example: https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004
 *      responses:
 *        200:
 *          description: 펀딩 수정 성공
 *        400:
 *          description: 요청 바디에서 필수 필드인 id가 없는 경우
 *        404:
 *          description: 해당 펀딩이 존재하지 않는 경우
 *        500:
 *          description: 펀딩 수정 실패
 */
router.post('/update', fundingController.updateFunding);

/**
 * @swagger
 *  /funding/delete:
 *    post:
 *      tags: [펀딩]
 *      summary: 펀딩 삭제 API
 *      requestBody:
 *        description: "펀딩 번호 입력"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 17
 *      responses:
 *        200:
 *          description: 펀딩 삭제 성공
 *        400:
 *          description: 요청 바디에서 필수 필드인 id가 없는 경우
 *        404:
 *          description: 해당 펀딩이 존재하지 않는 경우
 *        500:
 *          description: 펀딩 삭제 실패
 */
router.post('/delete', fundingController.deleteFunding);

/**
 * @swagger
 *  /funding/delete:
 *    post:
 *      tags: [펀딩]
 *      summary: 펀딩 참여 API
 *      requestBody:
 *        description: "펀딩 참여 입력"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 17
 *                    price:
 *                      type: number
 *                      example: 170000
 *      responses:
 *        200:
 *          description: 펀딩 참여 성공
 *        400:
 *          description: 요청 바디에서 필수 필드인 id 또는 price가 없는 경우
 *        404:
 *          description: 해당 펀딩이 존재하지 않는 경우
 *        500:
 *          description: 펀딩 참여 실패
 */
router.post('/participate', fundingController.participateFunding);

module.exports = router;