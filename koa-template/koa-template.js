const Koa = require('koa')
const views =require('koa-views')
const path = require('path')

const app = new Koa()


app.use(views(path.join(__dirname,'./view'),{
    extension:'pug'
}))
app.use(async (ctx)=>{
 let title ='hello koa2 pug'
 //使用pug模板引擎渲染index.pug文件
 await ctx.render('index',{
     title,
 })
})
app.listen(3000)
console.log('koa-views pug istarting at port 3000')

