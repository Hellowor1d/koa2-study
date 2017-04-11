//试试如何获取 post 方式提交的数据
const Koa = require('koa')
const app =new Koa()


app.use(async (ctx,net)=>{
    console.log(ctx.url)  //  "/"
    if(ctx.url==='/' && ctx.method ==='GET'){
        let html = `
        <h1>post method data psarse demo</h1>
        <form method="post" action='/'>
        <label>姓名</label>
        <input name="name" placeholder="姓名" />
        <label>年龄</label>
        <input name="age" placeholder="年龄" /> 
        <button type="submit"> submit </button>    
        </form>
        `
        ctx.body = html
    }else if(ctx.url==='/' && ctx.method ==='POST'){
        //这是点击submit按钮之后提交数据的请求处理，解析提交的数据，并用于显示在当前页面
        let postData = await parsePostData(ctx) //由此可以知道parsePostData函数返回的应当是一个promise对象
        ctx.body = postData
    }else{
        //遇到其他请求，返回404、
        ctx.body = `<h1>404  o(╯□╰)o</>`
    }
})

//解析post数据的函数,因为koa并未封装获取post参数的方法，所以要自己处理，解析context上下文中的nodejs req对象
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata = ""
            ctx.req.addListener('data',(data)=>{
                postdata += data
                console.log("postdata: ",postdata)   //postdata:  name=123&age=456
            }) 
            ctx.req.addListener('end',()=>{
                let parseData = parseQueryStr(postdata)//将postdata字符串再解析为json
                resolve(parseData)
            })
        }catch (err){
                reject(err)
        }
    })
}

function parseQueryStr(str){
    let queryData ={}
    let queryStrList = str.split('&')
    console.log("queryStrList: ",queryStrList)  //  queryStrList:  [ 'name=liu', 'age=25' ]
    for(let [index,queryStr] of queryStrList.entries()){
        let item = queryStr.split('=')
        console.log("item： ",item)  //item：  [ 'name', 'liu' ]
                                    // item：  [ 'age', '25' ]
        queryData[item[0]]=decodeURIComponent(item[1])
    }
    return queryData
}



app.listen(3001)
console.log('post.js started at 3001')