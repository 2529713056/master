module.exports = (req, res) => {
    //删除session
    req.session.destroy(function () {
        //删除cookie
        res.clearCookie("connect.sid")
        //重定向到登录页
        res.redirect("/admin/login")
        //删除模板中的userInfo
        req.app.locals.userInfo = null
    })
}