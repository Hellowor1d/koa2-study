//创建koa2

const Koa = require('koa')
//创建一个 Koa 对象表示 WebApp 本身
const app = new Koa()


app.use(async (ctx,next)=>{
   
    console.log(`request method: ${ctx.request.method} ${ctx.request.url}`)
     await next()
})

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx,next)=>{
    await next()
    // ctx.response.type = 'text/html'
    // ctx.response.body = '<h1>Hello,koa2!</h1>'
})

app.use(async (ctx,next)=>{
    ctx.response.body = ctx.request.url
    console.log(`nihao + ${ctx.body}`)
})

app.listen(3000)
console.log('app started at port 3000')

