const db = require('../../utils/modelBuild');
module.exports = {
    name: 'ProvinceCity', //数据model名称
    data: db.defineModel('province_citys', { // 表名
        id:{
            type: db.STRING(5),
            primaryKey: true,
            allowNull: false
        },
        name:{
            type: db.STRING(100),
            allowNull: true
        },
        ParentId:{
            type: db.STRING(5),
            allowNull: false
        },
        LevelType:{
            type: db.INTEGER(2),
            allowNull: false
        }
    },{
        timestamps: false
    })
};

// const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
