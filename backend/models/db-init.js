const { Sequelize } = require('sequelize');
const config = require('../config/config')['test'];

async function ensureDBExists() {
    const connection = new Sequelize('', config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        logging: false
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
        console.log('데이터베이스가 생성되었거나 이미 존재합니다');
    } catch(err) {
        console.error('DB 생성 중 오류 발생:', err);
        process.exit(1);
    } finally {
        await connection.close();
    }
}

module.exports = ensureDBExists;