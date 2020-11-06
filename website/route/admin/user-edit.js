//引入集合
const { User}  = require("../../model/user")
//渲染用户新增,编辑页面
module.exports = async (req,res)=>{
    req.app.locals.currentLink = 'user'
    //获取传递过来的参数. 有message,和id
    const  {message,id} = req.query
    if(id)
    {
        //如果传输过来了id,则代表是修改.
        //通过传递过来的id值,查询数据库,获得用户
        let user = await User.findOne({_id:id})
        //res.send(user)

        //渲染页面时,传递数据
        res.render("admin/user-edit",{
            message:message,
            user:user,
            button:'修改',
            link:'/admin/user-modify?id='+id
        })
    }
    else
    {
        //如果没有传递过来id,则代表是新增
        res.render("admin/user-edit",{
            message:message,
            button:'添加',
            link:'/admin/user-edit'
        })
    }
}