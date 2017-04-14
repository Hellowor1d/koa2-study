//通过koa-static中间件建立静态资源服务器，跟纯koa2实现static-server进行对比

const Koa = require('koa')
const path = require('path') 
const convert = require('koa-convert')
const static = require('koa-static')

const app = new Koa()

const staticPath = '../static-server/static'

app.use(convert(static(
    path.join(__dirname, staticPath)
)))

app.use(async(ctx)=>{
    ctx.body = 'hello world by koa-static-middleware'
})

app.listen(3001)
console.log('static-server-middleware is starting at port 3001')