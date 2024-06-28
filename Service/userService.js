const user = require('../Model/user');
const { createHashedPassword, verifyPassword } = require('./encryption');


async function isDuplicateId(id) {
    const result = await user.findOne({
        where: { id: id },
    });
    if (result) {
        console.log(id, ' 은/는 이미 사용중인 아이디 입니다.');
        return true;
    } else {
        console.log(id, ' 은/는 사용 가능한 아이디 입니다.');
        return false;
    }
}

async function createUser(req, res) {
    try {
        const { id, password, email, phone, name, image } = req.body;
        console.log(req.body);

        if (isDuplicateId(id) == true) {
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
        console.log(result);
        console.log('회원가입 성공!');
        return res.status(200).json({ message: '회원가입 성공' });

    } catch (err) {
        console.log('회원가입 중 오류 발생 : ', err);
        return res.status(500).json({ message: '회원가입 중 오류 발생'});
    }
};

exports.postCreateUser = (req, res, next) => createUser(req, res);