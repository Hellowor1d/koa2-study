const url = require('url')
const fs = require('fs')
const path = require('path')

//遍历读取目录的方法
const walk = require('./walk')

function dir(url, reqPath){
    let contentList = walk(reqPath)
    let html = `<ul>`
    //把目录url拼接好展示在html中
    for(let [index, item] of contentList.entries()){
        html = `${html}<li><a href="${url === '/'?'':url}/${item}">${item}</a>`
    }
    html = `${html}</ul>`
    return html

}
module.exports = dir