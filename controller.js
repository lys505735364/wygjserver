
const fs = require('fs'), router = require('koa-router')(); 

function addMapping(mapping) {    // 遍历每个导入进来的模块的所有属性，根据GET和POST不同添加到router中    
    Object.keys(mapping).map(key => {        
        if (mapping[key].method === "GET" || mapping[key].method === "get") {            
            router.get(key, mapping[key].handler);            
            console.log(`register URL mapping: ${mapping[key].method} ${key}`);        
        } else if (mapping[key].method === "POST" || mapping[key].method === "post") {            
            router.post(key, mapping[key].handler);            
            console.log(`register URL mapping: ${mapping[key].method} ${key}`);        
        } else if (mapping[key].method === "DELETE" || mapping[key].method === "delete") {            
            router.del(key, mapping[key].handler);            
            console.log(`register URL mapping: ${mapping[key].method} ${key}`);        
        } else if (mapping[key].method === "PUT" || mapping[key].method === "put") {            
            router.put(key, mapping[key].handler);            
            console.log(`register URL mapping: ${mapping[key].method} ${key}`);        
        } else{            // 无效的URL:            
            console.log(`invalid URL: ${mapping[key].method} ${key}`);        
        }    
    });
}

function addControllers(dir) {  // 扫描./controllers下所有的JS文件都导入进来；
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`ProcessController: read method controller file  ${f} `);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(mapping);
    });
}
module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers';
    addControllers(controllers_dir);
    return router.routes();
}