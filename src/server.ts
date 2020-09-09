import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';

import healthcheckRoutes from './routes/healthcheck';
import { config } from './config';

const PORT = config.port;

const app = new Koa();

app.use(bodyParser());

app.use(cors({
  origin: "*"
}));

app.use(logger());

app.use(healthcheckRoutes.routes());

import Router from 'koa-router';
const router = new Router();

router.get(`/`,async (ctx) => {
  try {
    ctx.body = {
      status: "Success!"
    }
  } catch (err) {
    console.error(err);
  }
})

app.use(router.routes());




const server = app.listen(PORT, async () => {
  console.log(`Server listening on port : ${PORT}`)
})
.on("error", err => {
  console.error(err)
});

export default server;