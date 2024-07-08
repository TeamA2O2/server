const express = require('express');
const router = express.Router();

const userController = require('../Service/userService.js');

/**
 * @swagger
 *  /user/checkDuplicatedId/{id}:
 *    get:
 *      tags: [유저]
 *      summary: 아이디 중복확인 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *          description: "중복확인할 아이디"
 *      responses:
 *        200:
 *          description: 로그인 성공
 *        401:
 *          description: 비밀번호 불일치
 *        404:
 *          description: 존재하지 않는 아이디
 *        500:
 *          description: 로그인 실패
 */
router.get('/checkDuplicatedId/:id', userController.checkDuplicatedId);

router.get('/getUserData/:id', userController.getUserData);

/**
 * @swagger
 *  /user/signIn:
 *    post:
 *      tags: [유저]
 *      summary: 로그인 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 정보 입력"
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: object
 *                properties:
 *                  id:
 *                      type: string
 *                      example: 'testid'
 *                  password:
 *                      type: string
 *                      example: 'testpassword'
 *      responses:
 *        200:
 *          description: 로그인 성공
 *        401:
 *          description: 비밀번호 불일치
 *        404:
 *          description: 존재하지 않는 아이디
 *        500:
 *          description: 로그인 실패
 */
router.post('/signIn', userController.signIn);

/**
 * @swagger
 *  /user/signUp:
 *    post:
 *      tags: [유저]
 *      summary: 회원가입 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "회원가입 정보 입력"
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                      id:
 *                        type: string
 *                        example: 'testid'
 *                      password:
 *                        type: string
 *                        example: 'testpassword'
 *                      email:
 *                        type: string
 *                        example: 'test@test.com'
 *                      phone:
 *                        type: string
 *                        example: '010-1234-5678'
 *                      name:
 *                        type: string
 *                        example: '김테스트'
 *                      image:
 *                        type: string
 *                        example: '아직 구현중.. 되면 업데이트함'
 *      responses:
 *        201:
 *          description: 회원가입 성공
 *        409:
 *          description: 이미 사용중인 아이디
 *        500:
 *          description: 회원가입 중 오류
 */
router.post('/signUp', userController.signUp);

/**
 * @swagger
 *  /user/editUser:
 *    post:
 *      tags: [유저]
 *      summary: 유저 정보 수정 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "수정된 유저 정보 입력"
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                      id:
 *                        type: string
 *                        example: 'testid'
 *                      password:
 *                        type: string
 *                        example: 'testpassword'
 *                      email:
 *                        type: string
 *                        example: 'test@test.com'
 *                      phone:
 *                        type: string
 *                        example: '010-1234-5678'
 *                      name:
 *                        type: string
 *                        example: '김테스트'
 *                      image:
 *                        type: string
 *                        example: '아직 구현중.. 되면 업데이트함'
 *      responses:
 *        200:
 *          description: 회원가입 성공
 *        404:
 *          description: 존재하지 않는 아이디
 *        500:
 *          description: 회원가입 중 오류
 */
router.post('/editUser', userController.editUser);

/**
 * @swagger
 *  /user/findId:
 *    post:
 *      tags: [유저]
 *      summary: 아이디 찾기 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "수정된 유저 정보 입력"
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                      name:
 *                        type: string
 *                        example: 홍길동
 *                      email:
 *                        type: string
 *                        example: test@test.com
 *                      phone:
 *                        type: string
 *                        example: 010-1234-1234
 *      responses:
 *        200:
 *          description: 아이디 찾기 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: 아이디 찾기 성공
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          example: 123
 *              examples:
 *                example1:
 *                  value:
 *                    message: 아이디 찾기 성공
 *                    data:
 *                     - id: thisisid
 *                example2:
 *                  value:
 *                    message: 아이디 찾기 성공
 *                    data:
 *                     - id: testid1
 *                     - id: testid2
 *        404:
 *          description: 일치하는 계정 없음
 *        500:
 *          description: 아이디 찾기 중 오류
 */
router.post('/findId', userController.findId);

/**
 * @swagger
 *  /user/resetPassword:
 *    post:
 *      tags: [유저]
 *      summary: 비밀번호 재설정 API
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "비밀번호 재설정을 위한 사용자 정보"
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                      id:
 *                        type: string
 *                        example: "testid"
 *                      name:
 *                        type: string
 *                        example: "홍길동"
 *                      email:
 *                        type: string
 *                        example: "test@test.com"
 *                      phone:
 *                        type: string
 *                        example: "010-1234-1234"
 *                      newPassword:
 *                        type: string
 *                        example: "newpassword123"
 *      responses:
 *        200:
 *          description: 비밀번호 업데이트 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: 비밀번호 업데이트 성공
 *        400:
 *          description: 비밀번호 업데이트 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: 비밀번호 업데이트 실패
 *        404:
 *          description: 일치하는 아이디가 없습니다.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: 일치하는 아이디가 없습니다.
 *        500:
 *          description: 비밀번호 업데이트 중 오류 발생
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: 비밀번호 업데이트 중 오류 발생
 */
router.post('/resetPassword', userController.resetPassword);

module.exports = router;