//引入User这个集合.
const {User} = require("../../model/user")
//引入加密模块
const bcrypt = require("bcrypt")

module.exports =  async (req, res) => {
    //post的参数,在req的body中
    //res.send(req.body)

    //为了保证程序的安全,在服务端再做一次参数是否提交的校验
    //解构,得到两个对象
    const {email, password} = req.body
    if (email.trim().length == 0 || password.trim().length == 0) {
        //这里的return是为了结束函数,不然他继续往后执行
        //return res.status(400).send("<h4>邮件地址或则密码错误<h4>")
        //使用一个模板来提示错误,效果更好看一点
        return res.status(400).render('admin/error', {msg: "邮件地址或则密码错误"})
    }

    //代码走到这里,则代表传入的邮箱,和密码. 那么需要和数据库中的数据,进行比对

    //传入邮箱,查询这个用户. 如果查到了返回用户,查不到返回null
    let user = await User.findOne({email})
    if (user) {
        //有这个邮箱的用户.  还的校验密码. 要检验加密后的密码
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            //给请求对象,设置一个自定义属性
            //req.username = user.username
            //将登录成功的用户名,记录在session中
            req.session.username = user.username
            //存储用户的角色
            req.session.role = user.role
            //让所有模板都得到这个用户
            req.app.locals.userInfo = user
            //res.send("登录成功")
            if (user.role == "admin")
            {
                //管理员,就重定向到用户列表页
                //重定向用用户列表页面
                res.redirect("/admin/user")
            }else
            {
                //普通用户,就重定向到首页
                res.redirect("/home")
            }
        } else {
            //密码不匹配,报错
            res.status(400).render('admin/error', {msg: "邮件地址或则密码错误"})
        }
    } else {
        //没有该邮箱对应的用户
        return res.status(400).render('admin/error', {msg: "邮件地址或则密码错误"})
    }
}