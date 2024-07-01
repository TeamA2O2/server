const { where } = require('sequelize');
const user = require('../Model/user');
const { createHashedPassword, verifyPassword } = require('./encryption');

async function checkDuplicatedId(req, res) {
    try {const id = req.params.id;
        console.log(id);

        const result = await user.findOne({
            where: { id: id }
        });

        if (result) {
            console.log('아이디 중복');
            return res.status(409).json({ result: '중복된 아이디입니다.' });
        }
        console.log('아이디 중복 아님');
        return res.status(200).json({ result: '사용 가능한 아이디 입니다.' });
        
    } catch (err) {
        console.log('아이디 중복확인 중 오류 발생', err);
        return res.status(500).json({ result: '아이디 중복확인 중 오류 발생' })
    }
}

async function signUp(req, res) {
    try {
        const { id, password, email, phone, name, image } = req.body;

        const findId = await user.findOne({
            where: { id: id }
        });

        if (findId) {
            console.log(id, ' 은/는 이미 사용중인 아이디 입니다.');
            return res.status(409).json({ result: '이미 사용중인 아이디입니다.' });
        }

        const { hashedPassword, salt } = await createHashedPassword(password);

        const result = await user.create({
            id: id,
            password: hashedPassword,
            email: email,
            phone: phone,
            name: name,
            image: image,
            salt: salt,
        });
        console.log('회원가입 성공!');
        return res.status(201).json({ result: '회원가입 성공' });

    } catch (err) {
        console.log('회원가입 중 오류 발생 : ', err);
        return res.status(500).json({ result: '회원가입 중 오류 발생' });
    }
};

async function signIn(req, res) {
    try {
        const { id, password } = req.body;

        const findId = await user.findOne({
            where: { id: id }
        });

        if (!findId) {
            console.log(id, ' 은/는 존재하지 않는 아이디 입니다.');
            return res.status(404).json({ result: '존재하지 않는 아이디입니다.' }); 
        }

        console.log(password, findId.salt, findId.password)
        const result = await verifyPassword(password, findId.salt, findId.password);
        if (!result) {
            console.log('비밀번호 불일치');
            return res.status(401).json({ 
                result: '비밀번호가 일치하지 않습니다', 
                result: {
                    id: findId.id,
                    email: findId.email,
                    phone: findId.phone,
                    name: findId.name,
                    image: findId.image
                }
            });
        }
        console.log('로그인 성공!');
        return res.status(200).json({ result: '로그인에 성공하였습니다! '});

    } catch(err) {
        console.log('로그인 중 오류 발생', err);
        return res.status(500).json({ result: '로그인 중 오류 발생' })
    }
}

exports.checkDuplicatedId = (req, res, next) => checkDuplicatedId(req, res);
exports.signUp = (req, res, next) => signUp(req, res);
exports.signIn = (req, res, next) => signIn(req, res);