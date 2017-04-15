//第一种设置session的方式：koa-generic-session  和 koa-redis 搭配。参照：https://github.com/koajs/generic-session
//注意：必须事先开启redis数据库，才能正常

// var session = require('koa-generic-session');
// var redisStore = require('koa-redis');
// var koa = require('koa');

// var app = new koa();
// app.keys = ['keys', 'keykeys'];
// app.use(session({
//   store: redisStore()
// }));

// app.use(function *() {
//   switch (this.path) {
//   case '/get':
//     get.call(this);
//     break;
//   case '/remove':
//     remove.call(this);
//     break;
//   case '/regenerate':
//     yield regenerate.call(this);
//     break;
//   }
// });

// function get() {
//   var session = this.session;
//   session.count = session.count || 0;
//   session.count++;
//   this.body = session.count;
// }

// function remove() {
//   this.session = null;
//   this.body = 0;
// }

// function *regenerate() {
//   get.call(this);
//   yield this.regenerateSession();
//   get.call(this);
// }

// app.listen(8080);