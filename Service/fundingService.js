const { where } = require('sequelize');
const funding = require('../Model/funding');

// 펀딩 생성
async function createFunding(req, res) {
	try {
		const { title, item, price, deadline, image, userId } = req.body.data;
		console.log('Received request body:', req.body);
		// Check if all required fields are present
		if (!title || !item || !price || !deadline || !userId) {
			return res.status(400).json({ 
				error: 'title:', title
			});
		}
		
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
		res.status(201).json({ message: '펀딩 생성' });
	} catch (err) {
		console.error('펀딩 생성 실패:', err);
		res.status(500).json({ error: '펀딩 생성 실패', err });
	}
}

// 펀딩 리스트 조회
async function viewListFunding(req, res) {
	const { userId } = req.body.data; // 요청 바디에서 userId 추출

	try {
		// 요청 바디에서 userId가 없는 경우 처리
		if (!userId) {
			return res.status(400).json({ error: 'request body에 userId가 없습니다.' });
		}

		const findList = await funding.findAll({
			where: { userId: userId },
			attributes: ['id', 'title', 'item', 'money', 'price'], // 필요한 속성만 선택
		});

		// 펀딩 게시글이 존재하지 않는 경우 처리
		if (findList.length === 0) {
			console.log('사용자가 펀딩을 생성하지 않았습니다.');
			return res.status(204).json();
		}

		console.log('펀딩 리스트 조회');
		res.status(200).json(findList);
	} catch (err) {
		console.error('펀딩 리스트 조회 실패:', err);
		res.status(500).json({ error: '펀딩 리스트 조회 실패' });
	}
}

// 특정 펀딩 조회
async function viewFunding(req, res) {
	const { id } = req.query; // 요청 쿼리에서 id 추출

	try {
		// 요청 쿼리에서 id가 없는 경우 처리
		if (!id) {
			return res.status(400).json({ error: 'request query에 id가 없습니다.' });
		}

		const findFunding = await funding.findAll({
			where: { id: id },
		});

		// 펀딩 게시글이 존재하지 않는 경우 처리
		if (findFunding.length === 0) {
			console.log('펀딩 미존재');
			return res.status(404).json({ error: '존재하지 않는 펀딩입니다.' });
		}

		console.log('펀딩 조회');
		res.status(200).json(findFunding);
	} catch (err) {
		console.error('펀딩 조회 실패:', err);
		res.status(500).json({ error: '펀딩 조회 실패' });
	}
}

// 특정 펀딩 수정
async function updateFunding(req, res) {
	try {
		const { id, title, item, price, deadline, image } = req.body.data;

		// 요청 바디에서 id가 없는 경우 처리
		if (!id) {
			return res.status(400).json({ error: 'request body에 id가 없습니다.' });
		}
		
		const newFunding = await funding.findOne({
			where: { id: id },
		});

		if (!newFunding) {
			console.log('펀딩 미존재');
			return res.status(404).json({ error: '존재하지 않는 펀딩입니다.' });
		}

		// 펀딩 정보 업데이트
		newFunding.title = title ? title : newFunding.title;
		newFunding.item = item ? item : newFunding.item;
		newFunding.price = price ? price : newFunding.price;
		newFunding.deadline = deadline ? deadline : newFunding.deadline;
		newFunding.image = image ? image : newFunding.image;

		await newFunding.save();

		console.log('펀딩 수정');
		res.status(201).json({ message: '펀딩 수정' });
	} catch (err) {
		console.error('펀딩 수정 실패:', err);
		res.status(500).json({ error: '펀딩 수정 실패' });
	}
}

// 특정 펀딩 삭제
async function deleteFunding(req, res) {
	const { id } = req.body.data; // 요청 바디에서 id 추출

	try {
		// 요청 바디에서 id가 없는 경우 처리
		if (!id) {
			return res.status(400).json({ error: 'request body에 id가 없습니다.' });
		}

		const findFunding = await funding.findOne({
			where: { id: id },
		});

		// 펀딩 게시글이 존재하지 않는 경우 처리
		if (!findFunding) {
			console.log('펀딩 미존재');
			return res.status(404).json({ error: '존재하지 않는 펀딩입니다.' });
		}

		await findFunding.destroy();

		console.log('펀딩 삭제');
		res.status(200).json({ message: '펀딩 삭제' });
	} catch (err) {
		console.error('펀딩 삭제 실패:', err);
		res.status(500).json({ error: '펀딩 삭제 실패' });
	}
}

// 펀딩 참여
async function participateFunding(req, res) {
	try {
		const { id, price } = req.body.data;

		// 요청 바디에서 id가 없는 경우 처리
		if (!id) {
			return res.status(400).json({ error: 'request body에 id가 없습니다.' });
		}
		
		// 요청 바디에서 id가 없는 경우 처리
		if (!price) {
			return res.status(400).json({ error: 'request body에 price가 없습니다.' });
		}
		
		const newFunding = await funding.findOne({
			where: { id: id },
		});

		if (!newFunding) {
			console.log('펀딩 미존재');
			return res.status(404).json({ error: '존재하지 않는 펀딩입니다.' });
		}

		// 펀딩 정보 업데이트
		newFunding.price += price;

		await newFunding.save();

		console.log('펀딩 참여');
		res.status(201).json({ message: '펀딩 참여' });
	} catch (err) {
		console.error('펀딩 참여 실패:', err);
		res.status(500).json({ error: '펀딩 참여 실패' });
	}
}

exports.createFunding = (req, res, next) => createFunding(req, res);
exports.viewListFunding = (req, res, next) => viewListFunding(req, res);
exports.viewFunding = (req, res, next) => viewFunding(req, res);
exports.updateFunding = (req, res, next) => updateFunding(req, res);
exports.deleteFunding = (req, res, next) => deleteFunding(req, res);
exports.participateFunding = (req, res, next) => participateFunding(req, res);
