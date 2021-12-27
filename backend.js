const Koa = require('koa');
const logger = require('koa-logger');
const router = require('@koa/router')();
const cors = require('@koa/cors');

const app = new Koa();

// middlewares

app.use(logger());
app.use(cors());

const helloWorld = (ctx) => {
  ctx.body = [0, 1, 2, 3, 4, 5, 7].map((x) => {
    return `file${x}`;
  });
};

router.get('/targets', helloWorld);

app.use(router.routes());

app.listen(3001);
