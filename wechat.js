const Router = require("koa-router");
const crypto = require("crypto");
const xml2js = require("xml2js");
const router = new Router();

// 占位符配置
const TOKEN = "RFjbJgZ7KDki5MgLvIgKcWpcQR8W2RU";
const ENCODING_AES_KEY = "cAL8PFLpK3htn4mHWxfWmxPQWwBvIR21IOLrdONfUWt";
const CORP_ID = "YOUR_CORP_ID";

// 签名校验函数
function checkSignature(token, timestamp, nonce, msg_encrypt) {
  const arr = [token, timestamp, nonce, msg_encrypt].sort();
  const str = arr.join("");
  return crypto.createHash("sha1").update(str).digest("hex");
}

// GET 验证URL有效性
router.get("/wechat", async (ctx) => {
  const { msg_signature, timestamp, nonce, echostr } = ctx.query;
  // 这里只做签名校验，未做解密（如需解密可用官方库）
  const signature = checkSignature(TOKEN, timestamp, nonce, echostr);
  if (signature === msg_signature) {
    ctx.body = echostr;
    console.log("🐯 ~ router.get ~ echostr:", echostr)
  } else {
    ctx.body = "Invalid signature";
  }
});

// POST 接收消息
router.post("/wechat", async (ctx) => {
  const { msg_signature, timestamp, nonce } = ctx.query;
  const xml = ctx.request.body;
  // 解析xml
  const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });
  const encrypt = parsed.xml.Encrypt;
  // 校验签名
  const signature = checkSignature(TOKEN, timestamp, nonce, encrypt);
  if (signature !== msg_signature) {
    ctx.body = "Invalid signature";
    return;
  }
  // 这里只返回收到的加密内容，实际业务应解密并处理
  ctx.body = "success";
});

module.exports = router;
