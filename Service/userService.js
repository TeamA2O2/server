const { where } = require('sequelize');
const user = require('../Model/user');
const { createHashedPassword, verifyPassword } = require('./encryption');

// 아이디 중복확인
async function checkDuplicatedId(req, res) {
    try {const id = req.params.id;

        const result = await user.findOne({
            where: { id: id }
        });

        if (result) {
            console.log('아이디 중복');
            return res.status(409).json({ message: '중복된 아이디입니다.' });
        }
        console.log('아이디 중복 아님');
        return res.status(200).json({ message: '사용 가능한 아이디 입니다.' });
        
    } catch (err) {
        console.log('아이디 중복확인 중 오류 발생', err);
        return res.status(500).json({ message: '아이디 중복확인 중 오류 발생' })
    }
}

// 아이디로 유저 데이터 조회
async function getUserData(req, res) {
    try {    
        const id = req.params.id;

        const result = await user.findOne({
            where: { id: id }
        });
		var imageURL = null;
		if (result.image) {
			imageURL = `${req.protocol}://${req.get('host')}/userImages/${result.image}`;
		}

        if (result) {
            console.log('아이디 찾음');
            return res.status(200).json({
                message: "아이디 찾음",
                data: {
                    id: result.id,
                    phone: result.phone,
                    email: result.email,
                    name: result.name,
                    image: imageURL
                }
            });
        }
        console.log('존재하지 않는 아이디');
        return res.status(404).json({ message: '존재하지 않는 아이디' });
    } catch(err) {
        console.log('유저 정보 조회 중 오류');
        return res.status(500).json({ message: '유저 정보 조회중 오류' });
    }
}

// 로그인
async function signIn(req, res) {
    try {
        const { id, password } = req.body.data;

        const findId = await user.findOne({
            where: { id: id }
        });

        if (!findId) {
            console.log(id, ' 은/는 존재하지 않는 아이디 입니다.');
            return res.status(404).json({ message: '존재하지 않는 아이디입니다.' }); 
        }

        const result = await verifyPassword(password, findId.salt, findId.password);
        console.log(result);
        if (!result) {
            console.log('비밀번호 불일치');
            return res.status(401).json({ 
                message: '비밀번호가 일치하지 않습니다'
            });
        }
        console.log('로그인 성공!');
        return res.status(200).json({ message: '로그인에 성공하였습니다!', userId: findId.id});

    } catch(err) {
        console.log('로그인 중 오류 발생', err);
        return res.status(500).json({ message: '로그인 중 오류 발생' })
    }
}

// 회원가입
async function signUp(req, res) {
    try {
        const { id, password, email, phone, name, image } = req.body.data;

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
        return res.status(201).json({ message: '회원가입 성공' });

    } catch (err) {
        console.log('회원가입 중 오류 발생 : ', err);
        return res.status(500).json({ message: '회원가입 중 오류 발생' });
    }
};

async function editUser(req, res) {
    try {
        const { id, password, email, phone, name } = JSON.parse(req.body.data);
        var image_name = null;

        // 사진도 있으면?
        if (req.file) {
            image_name = req.file.filename;
        }
        
        const findId = await user.findOne({
            where: {
                id: id
            }
        });
        if (!findId) {
            console.log('존재하지 않는 아이디');
            return res.status(404).json({ message: '존재하지 않는 아이디' });
        }

        const { hashedPassword, salt } = await createHashedPassword(password);
        const result = await user.update({
            password: hashedPassword,
            email: email,
            phone: phone,
            name: name,
            image: image_name,
            salt: salt
        }, {
            where: {
                id: id
            }
        });

        if (result > 0) {
            console.log('유저 정보 수정 성공');
            return res.status(200).json({ message: '유저 정보 수정 성공' });
        } else {
            console.log('유저 정보 수정 실패');
            return res.status(404).json({ message: '유저 정보 수정 실패' });
        }
    } catch(err) {
        console.log('유저 정보 수정 중 오류 : ', err);
        return res.status(500).json({ message: '유저 정부 수정 중 오류' });
    }
};

async function findId(req, res) {
    try {
        const name = req.body.data.name;
        const email = req.body.data.email;
        const phone = req.body.data.phone ;

        const findId = await user.findAll({
            attributes: ['id'],
            where: {
                name: name,
                email: email,
                phone: phone
            }
        });
        
        if (findId.length <= 0) {
            console.log('일치하는 유저가 없음');
            return res.status(404).json({ message: '일치하는 유저가 없음' });
        }
        console.log('아이디 찾기 성공');
        return res.status(200).json({ message: '아이디 찾기 성공', data: findId });
    } catch(err) {
        console.log('아이디 찾기 중 오류', err);
        return res.status(500).json({ message: '아이디 찾기 중 오류' });
    }
};

async function resetPassword(req, res) {
    try {
        const id = req.body.data.id;
        const name = req.body.data.name;
        const email = req.body.data.email;
        const phone = req.body.data.phone;
        const newPassword = req.body.data.newPassword;

        const findId = await user.findOne({
            where: {
                id: id,
                name: name,
                email: email,
                phone: phone,
            }
        });

        if (!findId) {
            console.log('일치하는 아이디가 없습니다.');
            return res.status(404).json({ message: '일치하는 아이디가 없습니다.' });
        }
        
        const { hashedPassword, salt } = await createHashedPassword(newPassword);

        const result = await user.update({
            password: hashedPassword,
            salt: salt
        }, {
            where: {
                id: findId.id
            }
        });
        // 왜 업데이트 안 됨? 왜 업데이트 안 됨? 왜 업데이트 안 됨? 왜 업데이트 안 됨? 왜 업데이트 안 됨? 왜 업데이트 안 됨?
        console.log(result);
        if (result <= 0) {
            console.log('비밀번호 업데이트 실패');
            return res.status(400).json({ message: '비밀번호 업데이트 실패' });
        }
        
        console.log('비밀번호 업데이트 성공');
        return res.status(200).json({ message: '비밀번호 업데이트 성공' });

    } catch(err) {
        console.log('비밀번호 업데이트 중 오류 발생', err);
        return res.status(500).json({ message: '비밀번호 업데이트 중 오류 발생' });
    }
}


exports.checkDuplicatedId = (req, res, next) => checkDuplicatedId(req, res);
exports.getUserData = (req, res, next) => getUserData(req, res);
exports.signIn = (req, res, next) => signIn(req, res);
exports.signUp = (req, res, next) => signUp(req, res);
exports.editUser = (req, res, next) => editUser(req, res);
exports.findId = (req, res, next) => findId(req, res);
exports.resetPassword = (req, res, next) => resetPassword(req, res);
exports.uploadImage = (req, res, next) => uploadImage(req, res);