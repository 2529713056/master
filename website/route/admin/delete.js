//引入集合
const { User}  = require("../../model/user")

module.exports =async (req,res)=>{
    //获取表单中的id
    //res.send(req.query.id)

    //拿这个id,去数据库中删除
    await User.findOneAndDelete({_id:req.query.id})
    //删除之后,重定向到用户列表页面
    res.redirect("/admin/user")
}