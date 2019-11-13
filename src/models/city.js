const db = require('../../config/db');
const Sequelize = require('sequelize');
module.exports = {
    name: 'provinceCitys', //数据model名称
    data: db.defineModel('province_citys', { // 表名
        type: db.STRING(20),
        name: db.STRING(100),
        pid: db.STRING(50)
    })
};