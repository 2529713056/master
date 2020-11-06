//guard 守卫. 实现未登录的拦截功能
const guard = (req,res,next)=>{
    if( req.url != "/login" && !req.session.username )
    {
        //未登录,重定向到登录页
        res.redirect("/admin/login")
    }else
    {
        //如果是登录状态,且是一个普通用户,那么需要拦截,只能到首页,不能到后台管理页面
        if(req.session.role == "normal")
        {
            return res.redirect("/home")
        }
        //已登录  放行
        next()
    }
}
module.exports = guard