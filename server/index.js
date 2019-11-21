// 设置环境
const isProduction = process.env.NODE_ENV === 'production';
const WEB_PATH = '/dist';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('./src/router');
const templating = require('./utils/templating');
const app = new Koa();

function run(rootPath) {

  // Console Log
  app.use(async (ctx, next) => {
    console.log(`[收到请求] ${ctx.request.method}: ${ctx.request.url} ......`);
    await next();
  });

  // Set request X-Response-Time:
  app.use(async (ctx, next) => {
    var start = new Date().getTime(),
      execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
  });

  // Set  static file support:
  if (!isProduction) {
    let staticFiles = require('./utils/staticFiles');
    app.use(staticFiles('/static/', rootPath + WEB_PATH + '/static'));
  }

  // parse request body:
  app.use(bodyParser());

  // Add nunjucks as view:
  app.use(templating(rootPath + '/dist', { // 相当于 Model View 的主目录
    noCache: !isProduction,
    watch: !isProduction
  }));

  // Add Router:
  app.use(Router());

  app.listen(3000);
  console.log('系统已启动:   http://localhost:3000/');
}
module.exports = {run};