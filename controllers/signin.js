const fn_index = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    if (name === 'Koa' && password === '123456') {
        // 登录成功:
        ctx.render('login.html', {
            title: 'Sign In OK',
            name: `Mr ${name}`
        });
    } else {
        // 登录失败:
        ctx.render('loginerr.html', {
            title: 'Sign In Failed'
        });
    }
};
module.exports = {
    '/signin': {
        method:'POST',
        handler: fn_index
    }
};