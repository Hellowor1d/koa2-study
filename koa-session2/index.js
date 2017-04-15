const Koa = require("koa");
const session = require("koa-session2");

const app = new Koa();

app.use(session({
    key: "SESSIONID",   //default "koa:sess"
}));

app.listen(3000)
console.log('koa-session2 is starting at port 3000')