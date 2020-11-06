const { User}  = require("../../model/user")
const bcrypt =  require("bcrypt")
module.exports = async  (req,res,next)=>{
    //接受post过来的数据
    const {username,email,role,state,password} = req.body
    //获取id
    const id = req.query.id
    //查询数据库,得到用户
    let user = await User.findOne({_id:id})
    //密码比对
    const isValid = await bcrypt.compare(password,user.password)
    if (isValid)
    {
        //比对密码通过,允许修改. 更新数据库
        await User.updateOne({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state
        })
        //重定向到用户列表页
        res.redirect('/admin/user')
    }else
    {
        //密码比对失败
        //提示错误信息,并且还要带过去id值,方便下一次修改
        next({path:'/admin/user-edit',message:'密码比对失败,不能进行用户信息的修改',id:id})
    }
}