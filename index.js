const Koa = require('koa')
const Router = require('koa-router')();
const multer = require('koa-multer');
const bodyParser = require('koa-bodyparser')
const path = require('path')
const app = new Koa();
//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public'))
    },
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
    }
})
//文件上传限制
const limits = {
    fields: 1024,//非文件字段的数量
    fileSize: 10 * 1024,//文件大小 单位 b
    files: 1//文件数量
}
const upload = multer({ storage, limits });
app.use(bodyParser());
Router.get('/', async (ctx, next) => {
    ctx.response.body = '<form action="/upload" enctype="multipart/form-data" method="post"><p><input type="hidden" name="name" value="qwe123"/></p><p>文件: <input type="file" name="file" /></p><input type="submit" value="Submit" /></form>';
});
Router.post('/upload', async (ctx, next) => {
    let err = await upload.single('file')(ctx, next)
        .then(res => res)
        .catch(err => err)
        console.log(ctx.req);
    if (err) {
        ctx.body = {
            code: 0,
            msg: err.message
        }
    } else {
        ctx.body = {
            code: 1,
            data: ctx.file
        }
    }
})

app.use(Router.routes()).use(Router.allowedMethods());

app.listen(3000)
console.log('server has start at http://localhost:3000');




