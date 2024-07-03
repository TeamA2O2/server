const { where } = require('sequelize');
const funding = require('../Model/funding');

// 펀딩 생성
async function createFunding(req, res) {
    try {
        const { title, item, price, deadline, image } = req.body;

		const newFunding = await funding.create({
		  	title,
		  	item,
		  	price,
			money: 0, // 초기값으로 0 설정
		  	deadline,
			image
		});
		
		console.log('펀딩 생성');
        res.status(201).json(newFunding);
  } catch (err) {
    console.error('Error creating funding:', err);
    res.status(500).json({ error: 'Error creating funding' });
  }
};

exports.createFunding = (req, res, next) => createFunding(req, res);