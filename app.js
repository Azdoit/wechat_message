const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const wechatRouter = require("./wechat");

const app = new Koa();

// 解析原始xml
app.use(
  bodyParser({
    enableTypes: ["text", "json"],
    extendTypes: { text: ["text/xml"] },
  })
);

app.use(wechatRouter.routes()).use(wechatRouter.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
