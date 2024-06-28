const { where } = require('sequelize');
const user = require('../Model/user');
const { createHashedPassword, verifyPassword } = require('./encryption');


async function signUp(req, res) {
    try {
        const { id, password, email, phone, name, image } = req.body;

        const findId = await user.findOne({
            where: { id: id }
        });

        if (findId) {
            console.log(id, ' 은/는 이미 사용중인 아이디 입니다.');
            return res.status(409).json({ message: '이미 사용중인 아이디입니다.' });
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
        return res.status(200).json({ message: '회원가입 성공' });

    } catch (err) {
        console.log('회원가입 중 오류 발생 : ', err);
        return res.status(500).json({ message: '회원가입 중 오류 발생'});
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
            return res.status(404).json({ message: '존재하지 않는 아이디입니다.' }); 
        }

        console.log(password, findId.salt, findId.password)
        const result = await verifyPassword(password, findId.salt, findId.password);
        if (!result) {
            console.log('비밀번호 불일치');
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' });
        }
        console.log('로그인 성공!');
        return res.status(200).json({ message: '로그인에 성공하였습니다! '});

    } catch(err) {
        console.log(err);
    }
}

exports.signUp = (req, res, next) => signUp(req, res);
exports.signIn = (req, res, next) => signIn(req, res);