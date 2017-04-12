const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mimes = require('./util/mime')

const app = new Koa()
//获取静态文件地址
const staticPath = './static/'
//通过路径文件的后缀解析文件类型
function parseMime(url){
    let extName = path.extname(url)
    extName = extName ? extName.slice(1):'unknow'
    return mimes[extName]
}
app.use(async (ctx)=>{
    let fullStaticPath = path.join(__dirname,staticPath)
    let _content = await content(ctx,fullStaticPath)
    let _mime = parseMime(ctx.url)
    if(_mime){
        ctx.type = _mime
    }

    if(_mime && _mime.indexOf('image/')>=0){
        ctx.res.writeHead(200)
        ctx.res.write(_content,'binary')
        ctx.res.end()
    }else{
        ctx.body = _content
    }
})

app.listen(3001)
console.log('static server is starting at port 3001')