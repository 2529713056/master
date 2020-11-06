//User          用于存数据库
//validateUser  用于检验
const {User,validateUser} = require("../../model/user")
//导入加密模块
const bcrypt = require("bcrypt")

module.exports =async (req,res,next)=>{
    //res.send("ok")
    //res.send(req.body)

    //如果检验不通过,则会抛出异常
    try{
        await validateUser(req.body)
    }catch (e) {
        //校验不通过
        //重定向来user-edit来显示错误信息
        //return res.redirect(`/admin/user-edit?message=${e.message}`)

        //next函数,一旦接受参数,就会错误处理
        return  next({path:'/admin/user-edit',message:e.message})
    }

    //校验通过. 存入数据库.邮箱用于登录,所以不能重复
    //查询邮箱地址是否已存在
    let user = await  User.findOne({email:req.body.email})
    console.log(user)
    if (user)
    {
        //该邮箱已存在. 那么不能加入数据库.
        //并且使用return结束函数
        //return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
        next({path:'/admin/user-edit',message:"邮箱地址已经被占用"})
    }
    //这个邮箱不存在,可以插入数据库. 需要将密码加密
    //生成随机字符串
    const salt = await bcrypt.genSalt(10)
    //加密
    const password = await  bcrypt.hash(req.body.password,salt)
    //替换
    req.body.password = password
    //插入数据库
    await  User.create(req.body)
    //将页面重定向到用户列表页
    res.redirect("/admin/user")
}