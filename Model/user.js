const Sequelize = require('sequelize');
const sequelize = require('../Database/mysql.js');

const user = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    salt: {
        type: Sequelize.STRING,
    }
}, {
    defaultScope: {
        // 검색 결과에서 'password'는 제외
        // attributes: { exclude: ['password'] }
    }
});

sequelize.sync();

module.exports = user;