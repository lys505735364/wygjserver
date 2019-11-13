const model = require('../model');
let ProvinceCitys = model.provinceCitys;
const fn_index = async (ctx, next) => {
    const data = await ProvinceCitys.findAll();
    ctx.response.body = data;
    ctx.response.type = 'text/json'
};
module.exports = {
    '/web/getTreeNode': {
        method:'GET',
        handler: fn_index
    }
};