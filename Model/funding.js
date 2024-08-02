const Sequelize = require('sequelize');
const sequelize = require('../Database/mysql.js');
const User = require('./user'); // user 모델 불러오기

const funding = sequelize.define('funding', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	item: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	money: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	deadline: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	image: {
		type: Sequelize.STRING(500),
		allowNull: true,
	},
	userId: {
		// 외래키
		type: Sequelize.STRING, // user 모델의 id 타입에 맞게 설정
		allowNull: false,
		references: { model: 'users', key: 'id' }, // users는 user 테이블의 이름
		onDelete: 'CASCADE', // 사용자가 삭제될 때 연결된 funding도 삭제
	},
});

// funding 모델이 user 모델을 참조하도록 설정
funding.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync();

module.exports = funding;