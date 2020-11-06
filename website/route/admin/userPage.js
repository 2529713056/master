//结构对象,获取集合构造函数
const { User}  = require("../../model/user")

module.exports =async (req, res) => {
    //响应user页面,并且将req的自定义username属性显示
    //现在通过session来读取自定义属性 username
    //res.render("admin/user")

    //接受客户端传递过来的当前页数
    let page = req.query.page || 1
    //查询数据的条数
    let count = await  User.countDocuments({})
    //每页显示的用户数
    let pageSize = 10
    //总页数. 22个用户,需要显示3页.就是向上取整
    let total = Math.ceil(count/pageSize)
    //查询数据开始的位置
    //如果要显示第2页,那么需要跳过10条
    let start = (page-1)*pageSize

    //读取数据库中的所有用户,进行展示
    //限制每页只有10条. 并且跳过指定的条数
    let users = await User.find().limit(pageSize).skip(start)
    //res.send(users)

    //记录当前是用户管理
    req.app.locals.currentLink = 'user'
    //渲染模板,并且传入数据
    res.render("admin/user",{
        users:users,
        count:count,
        total:total,
        page:page
    })
}