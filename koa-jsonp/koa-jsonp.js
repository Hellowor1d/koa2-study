// 解析原理

// JSONP跨域输出的数据是可执行的JavaScript代码
// ctx输出的类型应该是'text/javascript'
// ctx输出的内容为可执行的返回数据JavaScript代码字符串
// 需要有回调函数名callbackName，前端获取后会通过动态执行JavaScript代码字符，获取里面的数据

const Koa = require('koa')

const views =require('koa-views')
const path = require('path')
const app = new Koa()


app.use(views(path.join(__dirname,'./view'),{
    extension:'pug'
}))
app.use( async ( ctx ) => {

  // 如果jsonp 的请求为GET
  if ( ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {

    // 获取jsonp的callback
    let callbackName = ctx.query.callback || 'callback'
    let returnData = {
      success: true,
      data: {
        text: 'this is a jsonp api',
        time: new Date().getTime(),
      }
    }

    // jsonp的script字符串
    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`

    // 用text/javascript，让请求支持跨域获取
    ctx.type = 'text/javascript'

    // 输出jsonp字符串
    // ctx.body = jsonpStr

     let title ='hello koa2 pug'
 //使用pug模板引擎渲染index.pug文件
 await ctx.render('index',{
     title,jsonpStr
 })

  } else {

    ctx.body = 'hello jsonp'

  }
})

app.listen(3000)
console.log('[demo] jsonp is starting at port 3000')


