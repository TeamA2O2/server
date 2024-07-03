const Sequelize = require('sequelize');
const sequelize = require('../Database/mysql.js');

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
        type: Sequelize.STRING,
        allowNull: true,
    }
});

sequelize.sync();

module.exports = funding;