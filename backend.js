const path = require('path')
const Koa = require('koa');
const logger = require('koa-logger');
const router = require('@koa/router')();
const cors = require('@koa/cors');
const mount = require('koa-mount')
const serve = require('koa-static')

const app = new Koa();

// middlewares

app.use(logger());
app.use(cors());

const helloWorld = (ctx) => {
  ctx.body = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11].map((x) => {
    return `file${x}`;
  });
};

router.get('/targets', helloWorld);

app.use(router.routes());

app.use(mount('/static',serve(path.join(__dirname, './static'))))

app.listen(3001);
