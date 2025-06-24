# 企业微信消息接收 Koa2 示例

## 安装依赖

```bash
npm install
```

## 启动服务

```bash
npm start
```

## 配置参数

请在 `wechat.js` 文件中，将 `YOUR_TOKEN`、`YOUR_ENCODING_AES_KEY`、`YOUR_CORP_ID` 替换为你自己的企业微信配置。

## 接口说明

- `GET /wechat` 用于企业微信 URL 验证
- `POST /wechat` 用于接收企业微信推送的消息

> 注意：本示例仅做了签名校验和基础解析，未做消息解密和业务处理。如需解密消息，请参考企业微信官方文档或使用官方 SDK。
