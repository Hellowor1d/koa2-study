//koa2中调用cookie的练习
//koa2中操作cookies使用了npm的cookies模块,源码在https://github.com/pillarjs/cookies

//ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
// ctx.cookies.set(name, value, [options]) 在上下文中写入cookie

const Koa = require('koa')
const app = new Koa()

app.use( async (ctx)=>{
    if(ctx.url === '/index'){
        ctx.cookies.set(
            'cid',//name
            'hello world',//value
            //options
            {
                domain:'localhost',  //写cookie所在的域名
                path: '/index' ,//写cookie所在的路径
                maxAge: 10*60*1000, //cookie有效市场  
                expires: new Date('2018-4-30'),//cookie失效时间
                httpOnly: false, //是否只用于http请求中
                overwrite:false//是否允许重写
            }
            )
            ctx.body = 'cookie is ok'
    }else {
        ctx.body = 'hello world by koa-cookies'
    }
})

app.listen(3000)
console.log('koa-coooke is starting  at  port 3000')