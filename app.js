//创建koa2

const Koa = require('koa')
//创建一个 Koa 对象表示 WebApp 本身
const app = new Koa()
const fs = require('fs')


app.use(async(ctx, next) => {

    console.log(`request method: ${ctx.request.method} ${ctx.request.url}`)
    await next()
})

app.use(async(ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async(ctx, next) => {
    await next()
    // ctx.response.type = 'text/html'
    // ctx.response.body = '<h1>Hello,koa2!</h1>'
})
//渲染函数，是为了把view文件夹中的页面信息返回给浏览器
function render(url) {
   
    return new Promise((resolve, reject) => {
        let path = `./view/${url}`
        fs.readFile(path, 'utf-8', (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })

}

async  function route(url){
    let view  = '404.html'
    switch(url){
        case '/':
        view = 'index.html'
        break

        case '/index':
        view = 'index.html'
        break

        case '/todo':
        view = 'todo.html'
        break

        case '/404':
        view = '404.html'
        break 

        default:
        break

    }
    let html = await render(view)
    return html
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = await route( url )
  ctx.body = html
})

app.listen(3000)
console.log('app started at port 3000')