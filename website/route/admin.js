//博客后台管理的路由
const express = require("express")
//获取路由对象
const admin = express.Router()
//二级路由地址
//渲染登录页
admin.get("/login", require("./admin/loginPage"))
//请求user页面
admin.get("/user", require("./admin/userPage"))
//退出登录
admin.get("/logout", require("./admin/logout"))
//获取登录的用户名,密码
admin.post("/login", require("./admin/login"))
//新增,编辑用户
admin.get("/user-edit",require("./admin/user-edit"))
//新增用户post操作. 功能
admin.post("/user-edit",require("./admin/user-edit-fn"))
//新增用户post操作.修改用户
admin.post("/user-modify",require("./admin/user-modify"))
//删除用户
admin.get("/delete",require("./admin/delete"))
//文章列表d
admin.get("/article",require("./admin/article"))
//编辑文章
admin.get("/article-edit",require("./admin/article-edit"))
//新增文章
admin.post('/article-add',require("./admin/article-add"))
//将路由对象作为模块成员进行导出
module.exports = admin