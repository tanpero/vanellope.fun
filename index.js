const Koa = require('koa');
const Router = require('koa-router');
const staticServe = require('koa-static');

const app = new Koa();
const router = new Router();

// 静态文件服务
app.use(staticServe(__dirname + '/public'));

// 路由配置
router.get('/', async (ctx) => {
  ctx.body = fs.readFileSync('./public/index.html', 'utf-8');
});

router.get('/api/info', async (ctx) => {
  // 构建响应数据
  const data = {
    lastUpdated: lastUpdated,
    totalVisitors: totalVisitors,
    todayVisitors: todayVisitors,
  };

  // 设置响应类型为 JSON 并返回数据
  ctx.type = 'application/json';
  ctx.body = data;
});


app.use(router.routes()).use(router.allowedMethods());

const port = 80;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});