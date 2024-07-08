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
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "펀딩 정보 입력"
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: '선물 주세요'
 *                  item:
 *                      type: string
 *                      example: '맥북'
 *                  price:
 *                      type: number
 *                      example: 2300000
 *                  deadline:
 *                      type: timestamp
 *                      example: 2024-12-31
 *                  userId:
 *                      type: string
 *                      example: 'testid2'
 *                  image:
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
 *    get:
 *      tags: [펀딩]
 *      summary: 펀딩 리스트 조회 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "사용자 정보 입력"
 *          required: true
 *          schema:
 *              type: object
 *              properties:                 
 *                  userId:
 *                      type: string
 *                      example: 'testid2'
 *      responses:
 *        200:
 *          description: 성공적으로 펀딩 리스트를 조회한 경우
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                          example: 1
 *                      title:
 *                          type: string
 *                          example: '선물 주세요'
 *                      price:
 *                          type: number
 *                          example: 2300000
 *                      money:
 *                          type: number
 *                          example: 50000
 *        204:
 *          description: 사용자가 생성한 펀딩이 없는 경우
 *        400:
 *          description: 요청 바디에서 필수 필드인 userId가 없는 경우
 *        500:
 *          description: 펀딩 리스트 조회 실패
 */
router.get('/viewList', fundingController.viewListFunding);


router.get('/view', fundingController.viewFunding);


/**
 * @swagger
 *  /funding/update:
 *    post:
 *      tags: [펀딩]
 *      summary: 펀딩 수정 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "펀딩 번호 입력"
 *          required: true
 *          schema:
 *              type: object
 *              properties:                 
 *                  id:
 *                      type: number
 *                      example: 1
 *                  title:
 *                      type: string
 *                      example: '나 곧 생일인데...'
 *                  item:
 *                      type: string
 *                      example: '가방'
 *                  price:
 *                      type: number
 *                      example: 185000
 *                  deadline:
 *                      type: timestamp
 *                      example: 2024-9-30
 *                  userId:
 *                      type: string
 *                      example: 'testid2'
 *                  image:
 *                      type: string
 *                      example: image/jpeg;base64,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
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
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "펀딩 번호 입력"
 *          required: true
 *          schema:
 *              type: object
 *              properties:                 
 *                  id:
 *                      type: number
 *                      example: 1
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
router.get('/delete', fundingController.deleteFunding);

router.post('/participate', fundingController.participateFunding);

module.exports = router;