const Sequelize = require('sequelize');
const sequelize = require('../Database/mysql.js');

const funding = sequelize.define('funding', {
	id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
	title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
	itme: {
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
        allowNull: false,
    }
});

sequelize.sync();

module.exports = funding;