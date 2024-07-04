const { where } = require('sequelize');
const funding = require('../Model/funding');

// 펀딩 생성
async function createFunding(req, res) {
	try {
		const { title, item, price, deadline, image, userId } = req.body;

		const newFunding = await funding.create({
			title,
			item,
			price,
			money: 0, // 초기값으로 0 설정
			deadline,
			image,
			userId,
		});

		console.log('펀딩 생성');
		res.status(201).json(newFunding);
	} catch (err) {
		console.error('펀딩 생성 실패:', err);
		res.status(500).json({ error: '펀딩 생성 실패' });
	}
}


// 펀딩 리스트 조회
async function viewListFunding(req, res) {
	const { userId } = req.body; // 요청 바디에서 userId 추출

	try {
        // 요청 바디에서 userId가 없는 경우 처리
        if (!userId) {
            return res.status(400).json({ error: 'request body에 userId가 없습니다.' });
        }

        const findList = await funding.findAll({
			where: { userId: userId },
			attributes: ['title', 'item', 'money', 'price'] 	// 필요한 속성만 선택
		});

        console.log('펀딩 리스트 조회');
        res.status(200).json(findList);
    } catch (err) {
        console.error('펀딩 리스트 조회 실패:', err);
        res.status(500).json({ error: '펀딩 리스트 조회 실패' });
    }
}

exports.createFunding = (req, res, next) => createFunding(req, res);
exports.viewListFunding = (req, res, next) => viewListFunding(req, res);