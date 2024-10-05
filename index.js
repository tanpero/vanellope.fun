const Koa = require('koa');
const Router = require('koa-router');
const staticServe = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require("path")
const fs = require("fs")

const app = new Koa();
const router = new Router();

app.use(bodyParser());


// 静态文件服务
app.use(staticServe(__dirname + '/public'));

// 路由配置
router.get('/', async (ctx) => {
  ctx.body = fs.readFileSync('./public/index.html', 'utf-8');
});

const { latinify } = require("./latinify")

// 用于处理 GET 请求的中间件
router.get('/latinify', async (ctx) => {
    // 读取 public/routes/latinify/index.html 文件并发送给客户端
    const filePath = path.join(__dirname, 'public/routes/latinify/index.html');
    const content = fs.readFileSync(filePath);
    ctx.type = 'html';
    ctx.body = content;
});

router.post('/latinify', async (ctx) => {
  // 解析请求体中的 JSON
  const body = await ctx.request.body;
  // 获取 JSON 对象中的 text 属性
  const text = body.text;
  // 将 text 属性的值转换为大写
  ctx.body = { text: latinify(text) };
});


// router.get('/api/info', async (ctx) => {
//   // 构建响应数据
//   const data = {
//     lastUpdated: lastUpdated,
//     totalVisitors: totalVisitors,
//     todayVisitors: todayVisitors,
//   };

//   // 设置响应类型为 JSON 并返回数据
//   ctx.type = 'application/json';
//   ctx.body = data;
// });


app.use(router.routes()).use(router.allowedMethods());

const port = 80;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});