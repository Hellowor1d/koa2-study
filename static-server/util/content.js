const path = require('path')
const fs = require('fs')
//封装读取目录内容的方法
const dir = require('./dir')
//封装读取文件内容的方法
const file = require('./file')

async function content(ctx,fullStaticPath) {
    let reqPath = path.join(fullStaticPath,ctx.url)
    let exist = fs.existsSync(reqPath)
    let content = ''
    if (!exist) {
        content = '404 Not Found o(╯□╰)o'
    }else{
        let stat = fs.statSync(reqPath)
        //通过判断是文件夹还是文件，分别调用两种方法读取内容返回给content，也就是页面展示目录信息还是具体的内容信息
        if (stat.isDirectory()) {
            content = dir(ctx.url,reqPath)
            
        }else{
            content = await file(reqPath)
        }
    }
    return content 
}
module.exports = content