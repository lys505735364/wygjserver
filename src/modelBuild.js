const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const config = require('../config/db-config');
const sqlOperType = require('./sqlOperType');
console.log('初始化数据库连接...');

function generateId() {
    return uuid.v4();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const ID_TYPE = Sequelize.STRING(50);
const TYPES = [
    'STRING',
    'TEXT',
    'INTEGER',
    'BIGINT',
    'FLOAT',
    'DOUBLE',
    'DATE',
    'DATEONLY',
    'BOOLEAN',
    'ENUM'
];

function defineModel(tableName, attributes, configuration) {
    return sequelize.define(tableName, attributes, configuration);
}


const modelBuildFN = {
    defineModel: defineModel,
    sync: () => {
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    modelBuildFN[type] = Sequelize[type];
}

modelBuildFN.ID = ID_TYPE;
modelBuildFN.generateId = generateId;

module.exports = modelBuildFN;