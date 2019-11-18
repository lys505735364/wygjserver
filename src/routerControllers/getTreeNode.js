const Models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let ProvinceCity = Models.ProvinceCity;
const fn_index = async (ctx, next) => {
    const data = await ProvinceCity.findAll({ 
        where: {
            level: {
                [Op.lt]: 2
            } 
        } 
    });
    ctx.response.body = data;
    ctx.response.type = 'text/json'
};
module.exports = {
    '/web/getTreeNode': {
        method: 'GET',
        handler: fn_index
    }
};