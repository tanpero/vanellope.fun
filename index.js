import Koa from 'koa'
import Router from 'koa-router'
import staticServe from 'koa-static'
import bodyParser from 'koa-bodyparser'
import { join as pathJoin } from 'path' // 注意，path模块的用法稍有不同
import fs from 'fs'
import path from "path"

import { remark } from 'remark'
import html from 'remark-html'

const app = new Koa()
const router = new Router()

app.use(bodyParser())


// 静态文件服务
app.use(staticServe('./public'))


router.get('/blogs', async (ctx) => {
  const indexJson = await fs.promises.readFile('./public/blogs/index.json', 'utf8')
  const index = JSON.parse(indexJson)
  ctx.body = index
})

// 获取博文标题
router.get('/blogs/:id/title', async (ctx) => {
  const indexJson = await fs.promises.readFile('./public/blogs/index.json', 'utf8')
  const index = JSON.parse(indexJson)
  ctx.body = index[ctx.params.id]
})

// 获取博文内容
router.get('/blogs/:id/content', async (ctx) => {
  const filePath = `./public/blogs/${ctx.params.id}.md`
  const fileContent = await fs.promises.readFile(filePath, 'utf8')
  const result = await remark().use(html).process(fileContent)
  ctx.type = 'html'
  ctx.body = result.toString()
})

import generateBlog from './generate-blog.js'

router.get('/blogs/:id', async (ctx) => {
  ctx.body = await generateBlog(ctx.params.id)
})

import getPoem from "./get-poem.js"

router.get('/get-poem', async (ctx) => {
  ctx.body = await getPoem()
})

// 路由配置
router.get('/', async (ctx) => {
  ctx.body = await fs.promises.readFile('./public/index.html', 'utf-8')
})

import latinify from "./latinify.js"

// 用于处理 GET 请求的中间件
router.get('/latinify', async (ctx) => {
    // 读取 public/routes/latinify/index.html 文件并发送给客户端
    const filePath = './public/routes/latinify/index.html'
    const content = fs.readFileSync(filePath)
    ctx.type = 'html'
    ctx.body = content
})

router.post('/latinify', async (ctx) => {
  // 解析请求体中的 JSON
  const body = await ctx.request.body
  // 获取 JSON 对象中的 text 属性
  const text = body.text
  // 将 text 属性的值转换为大写
  ctx.body = { text: latinify(text) }
})


// router.get('/api/info', async (ctx) => {
//   // 构建响应数据
//   const data = {
//     lastUpdated: lastUpdated,
//     totalVisitors: totalVisitors,
//     todayVisitors: todayVisitors,
//   }

//   // 设置响应类型为 JSON 并返回数据
//   ctx.type = 'application/json'
//   ctx.body = data
// })


app.use(router.routes()).use(router.allowedMethods())

const port = 80
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})