// 设置环境
const isProduction = process.env.NODE_ENV === 'production';
// import {isProduction, HOST_NAME, WEB_PATH} from './stttings';
const WEB_PATH = '/dist';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const templating = require('./src/templating');
const controller = require('./src/controller');
const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`[收到请求] ${ctx.request.method}: ${ctx.request.url} ......`);
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
    let staticFiles = require('./config/staticFiles');
    app.use(staticFiles('/static/', __dirname + WEB_PATH +'/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating(__dirname + '/dist', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

app.listen(3000);
console.log('系统已启动:   http://localhost:3000/');