## 海大新媒体

## 地址 

[测试版](http://www.shouedu.cn) 暂时停止

## 更新

本项目正在重写，新技能栈 `vue`全家桶+`node.js`+`koajs`+`mongodb` 使用`cordova`或者`weex`实现移动端app，可能会使用`electron`。

## 功能

海大新型URP查询暨校园生活网页

* 查询课程表 api[✔] 前端[]
* 查询成绩 api[✔] 前端[]
* 查询个人信息 api[✔] 前端[]
* 登录urp系统 api[✔] 前端[]

## 更新日志


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