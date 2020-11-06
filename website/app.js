//引入express框架
const express = require("express")
//引入拼接路径的模块
const path = require("path")
//引入body-parser模块,用于处理post请求参数
const bodyParser = require("body-parser")
const session = require("express-session")
//导入格式化日期模块
const dateformat = require("dateformat")
//导入模板引擎
const template = require("art-template")
//向模板导入变量,函数
template.defaults.imports.dateformat =dateformat
//创建服务器
const app = express()
//连接数据库
require("./model/connect")

//拦截所有请求,设置启用session
app.use(session({
    secret:"secret key",  //服务端秘钥
    saveUninitialized:false, //用户未登录,不要保存cookie
    cookie:{
        //cookie会存在一个过期时间.如果没有设置,那么会在浏览器关闭的时候过期
        //关闭浏览器,依然是登录状态
        //maxAge: 24*60*60*1000  //毫秒数.  将在一天后过期.没有过期前,都是登录成功状态
        //关闭浏览器,丢失登录状态,那么就不要设置maxAge
    }
}))

//如何处理post参数
//extended:false   调用querystring这个模块,来处理参数
app.use(bodyParser.urlencoded({extended:false}))

//引入这个user.js就是为了创建一个初始用户
//require("./model/user")

//告诉express框架模板存放的位置
app.set("views",path.join(__dirname,"views"))
//告诉express框架默认的后缀是什么.后续使用可以不带后缀
app.set("view engine","art")
//当渲染后缀为art的模板时,所使用的模板引擎是什么
app.engine("art",require("express-art-template"))

//开放静态资源目录
//测试静态资源是否可用: http://localhost/home/css/base.css
app.use(express.static(path.join(__dirname,"public")))

//拦截访问admin的所有请求,判断用户的登录状态
app.use("/admin",require("./middleware/loginGuard"))

//引入配置模块
const config = require("config")
//读取对应环境下的title值
//如果对应环境下获取不到title值,那么就回去default.json中去获取
console.log( config.get('title') )

//导入控制台打印请求的模块
const morgan = require("morgan")
//获取系统环境变量的值,返回一个对象
//如果系统环境变量修改了,那么需要重启终端,才会有效
//console.log( process.env )
//判断当前是开发环境还是生产环境
if(process.env.NODE_ENV == 'development')
{
    console.log("当前是开发环境")
    //在开发环境下,打印请求信息
    app.use(morgan('dev'))
}else
{
    console.log("当前是生产环境")
}

//获取两个路由
const home = require("./route/home")
const admin = require("./route/admin")
//为路由匹配请求路径
app.use("/home",home)
app.use("/admin",admin)

//在所有路由的后面,添加错误处理
app.use((err,req,res,next)=>{
    //res.redirect(`/admin/user-edit?message=${e.message}`)
    //将错误的信息,由err对象接受过来
    //res.redirect(`${err.path}?message=${err.message}`)

    //改造成这样的格式  xxx?message=密码比对失败,不能进行用户信息的修改&id=xxxxx
    //err  {path:'/admin/user-edit',message:'密码比对失败,不能进行用户信息的修改',id:id}
    let params = []
    for(let attr in  err)  //遍历这个js对象
    {
        if(attr != 'path')  //path这个字段,不需要拼接
        {
                     // message = err[message]
            params.push(attr + '=' + err[attr])
        }
    }
    //params: ['message=xx','id=xxxx']
    //地址中路径只有一个,所以不处理,但是参数有多个,所以要用&连接
    res.redirect(`${err.path}?${params.join("&")}`)
})

//监听端口
app.listen(80)
console.log("网站服务器启动成功,请访问localhost")

//让art格式的模板文件,识别为html.方便进行代码的编辑
//文件->设置->编辑器->文件类型->HTML->点击加号->*.art

//css等外链资源的路径问题?
//页面上的css是一个相对路径,这个路径不是相对于项目文件,而是相对于浏览器的路径
// 现在需要将页面上的外链资源路径改为绝对路径
// 需要将外链资源路径改为 :/admin/lib/bootstrap/css/bootstrap.min.css
// 总结: 模板中的外链资源都需要使用绝对路径.

// cookie 是客户端用于存储服务器返回数据的方式.
//session 是服务器记录数据的对象.

//每次客户端登录成功,那么就会在session中生成一个sessionid,用于记录哪个用户登录成功了.并且将这个sessionid作为响应返回给客户端,存储于cookie中.  那么以后每次客户端做请求的时候,都会自动带上这个cookie,然后服务器回去session对象中去比对,有没有这个sessionid,有则代表登录成功,无则代表登录失败

//服务器还会存在一个秘钥,用于加密cookie数据.客户端没有这个秘钥,所以客户端存储了数据,但是不知道数据表示的是什么值

//代码修改,会导致服务器重启,那么session就会重置. 登录状态也会丢失

//app.js 是项目的主入口.那么里面不要写逻辑的实现.只写资源的引入与配置