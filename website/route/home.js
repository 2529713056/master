//博客前台的路由
const express = require("express")
//获取路由对象
const home = express.Router()

//二级路由地址
//博客首页
home.get("/",require("./home/index"))
//博客详情页
home.get( "/article",require("./home/article"))
//提交评论
home.post( "/comment",require("./home/comment"))
//将路由对象作为模块成员进行导出
module.exports = home