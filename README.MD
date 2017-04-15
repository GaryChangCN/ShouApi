## 海大新媒体

上海海洋大学新型URP查询暨校园生活服务端（api端）

**目前前端只有小程序版** 
[海大新媒体小程序]("https://github.com/GaryChangCN/ShouMedia-wxapp")

[API文档](./api.md);

## 使用

```
git clone
npm install
```

如果你不需要使用小程序接口，可以再app.js里面注释掉小程序接口部分，
如果使用则需要修改小程序配置文件在根目录的wxappConfig.js里，格式在wxappConfig.example.js中

## 更新日志

### 2017-3-15
接口基本完成
### 2017-4-10
后台“通用部分”重构完成，项目请求urp模块和返回信息完全解耦，添加本地验证和在线验证urp账号密码链
### 2017-4-09
vue写的版本和最早用requirejs洗的版本放在old分支，主分支值用来当服务端。
### 2017-4-02
今天做了个决定，这个版本的server端只给小程序使用
### 2017-03-29
使用koa2替代koa1，全面步入async await时代,发布了一个npm包，
[koa2-formidable](https://www.npmjs.com/package/koa2-formidable)用来解决之前用的koa-formidable没有
使用async 函数问题。 **小程序版本提上日程**
### 2017-02-19
使用 superagent promise 替换用 Promise 构造函数封装
### 2017-02-18
完成获取校园卡图片
### 2017-02-17
完成查询课程表、成绩个人详细信息api，
todo:校园卡照片
### 2017-02-16
使用 superagent + cherrio 代替 request + jsdom
### 2016-12-19
更新了一些接口，[接口文档](server/api.md)
### 2016-04-02
海大新媒体 测试版 1.0 上线 

## API

[文档](/server/api.md)

## LICENSE

[license](/LICENSE)