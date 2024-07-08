const express = require('express');
const router = express.Router();

const userController = require('../Service/userService.js');

/**
 * @swagger
 * /user/checkDuplicatedId/{id}:
 *   get:
 *     tags: [유저]
 *     summary: 아이디 중복 확인 API
 *     description: 입력한 아이디가 이미 사용 중인지 확인하는 API입니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용할 아이디
 *     responses:
 *       200:
 *         description: 사용 가능한 아이디
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사용 가능한 아이디 입니다.
 *       409:
 *         description: 중복된 아이디
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 중복된 아이디입니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 아이디 중복확인 중 오류 발생
 */
router.get('/checkDuplicatedId/:id', userController.checkDuplicatedId);

/**
 * @swagger
 * /user/getUserData/{id}:
 *   get:
 *     tags: [유저]
 *     summary: 유저 데이터 조회
 *     description: 주어진 아이디로 유저의 데이터를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 유저의 아이디
 *     responses:
 *       200:
 *         description: 유저 데이터를 성공적으로 조회하였습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 아이디 찾음
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: testid
 *                     phone:
 *                       type: string
 *                       example: "010-1234-5678"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       example: "홍길동"
 *                     image:
 *                       type: string
 *                       example: "https://ao-rztme.run.goorm.site/userImages/54976dc1-7aa4-4621-b0a2-6552bda0b4c4.jpg"
 *       404:
 *         description: 유저를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 존재하지 않는 아이디
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 유저 정보 조회 중 오류
 */
router.get('/getUserData/:id', userController.getUserData);

/**
 * @swagger
 * /user/signIn:
 *   post:
 *     summary: 로그인 API
 *     description: 사용자 로그인을 처리하는 API입니다.
 *     tags: [유저]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: 사용자 아이디
 *                     example: testid2
 *                   password:
 *                     type: string
 *                     format: password
 *                     description: 사용자 비밀번호
 *                     example: 123123
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인에 성공하였습니다!
 *                 userId:
 *                   type: string
 *                   example: testid
 *       401:
 *         description: 비밀번호 불일치
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 비밀번호가 일치하지 않습니다
 *       404:
 *         description: 존재하지 않는 아이디
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 존재하지 않는 아이디입니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인 중 오류 발생
 */
router.post('/signIn', userController.signIn);

/**
 * @swagger
 * /user/signUp:
 *   post:
 *     tags: [유저]
 *     summary: 회원가입 API
 *     description: 사용자가 회원가입을 요청하는 API입니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: 사용할 아이디
 *                     example: testid
 *                   password:
 *                     type: string
 *                     format: password
 *                     description: 사용할 비밀번호
 *                     example: testpassword
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: 이메일 주소
 *                   phone:
 *                     type: string
 *                     description: 전화번호
 *                     example: 010-1234-1234
 *                   name:
 *                     type: string
 *                     description: 사용자 이름
 *                     example: 김수한무거북이와두루미
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 회원가입 성공
 *       409:
 *         description: 이미 사용 중인 아이디
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 이미 사용중인 아이디입니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 회원가입 중 오류 발생
 */
router.post('/signUp', userController.signUp);

/**
 * @swagger
 * user/editUser:
 *   post:
 *     summary: 유저 정보 수정 API
 *     description: 사용자 정보를 수정하는 API입니다. 이미지를 제외한 모든 값들이 필수로 입력되어야 합니다.<br>모든 값들 채워서 보내야 해요. 비운 값 있으면 그대로 null로 들어가기 때문!!<br>+ 이미지같은 경우 주소 빼고 이미지 이름만 넣기 ex) asdff3-dfada.png
 *     tags: [유저]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: data
 *         required: true
 *         type: string
 *         description: "수정할 사용자 정보(JSON 형태로 전달). 포함 필드: id, password, email, phone, name."
 *       - in: formData
 *         name: image
 *         type: file
 *         description: 사용자 프로필 이미지 파일 (선택 사항).
 *     responses:
 *       200:
 *         description: 유저 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 유저 정보 수정 성공
 *       404:
 *         description: 존재하지 않는 아이디
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 존재하지 않는 아이디
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 유저 정보 수정 중 오류
 */
router.post('/editUser', userController.editUser);

/**
 * @swagger
 * user/findId:
 *   post:
 *     summary: 유저 아이디 찾기 API
 *     description: |
 *       이름, 이메일, 전화번호를 기준으로 유저 아이디를 찾는 API입니다.
 *       
 *       찾고자 하는 유저의 이름, 이메일, 전화번호를 요청 본문에 JSON 형태로 전달합니다.
 *       
 *       만약 일치하는 유저가 없을 경우 404 상태 코드와 함께 '일치하는 유저가 없음' 메시지가 반환됩니다.
 *       
 *       성공 시 200 상태 코드와 함께 '아이디 찾기 성공' 메시지와 찾은 유저의 아이디 목록이 반환됩니다.
 *       
 *     tags: [유저]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 유저의 이름
 *               email:
 *                 type: string
 *                 description: 유저의 이메일
 *               phone:
 *                 type: string
 *                 description: 유저의 전화번호
 *             example:
 *               name: 홍길동
 *               email: example@example.com
 *               phone: "010-5597-1123"
 *     responses:
 *       200:
 *         description: 아이디 찾기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 아이디 찾기 성공
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 유저 아이디
 *                         example: testid
 *       404:
 *         description: 일치하는 유저가 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 일치하는 유저가 없음
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 아이디 찾기 중 오류
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