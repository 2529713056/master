//导入文章集合
const {Article} = require("../../model/article")
//引入分页模块
const  pagination = require("mongoose-sex-page")
module.exports = async (req,res)=>{
    //所有模板都可以使用的变量
    req.app.locals.currentLink = 'article'
    //将所有的文章从数据库中读取出来
    //关联查询. 因为作者的信息来源于User集合
    //populate('author')
    //let articles = await Article.find()

    //接受传递过来的页码
    const page = req.query.page
    //使用分页模块
    //page()  当前页码
    //size()  每页显示的条数
    //display(3)  要显示的页码   [1,2,3]
    //exec()  执行
    // total  总条数
    // records  存放数据的数组
    // pages   总页数
    let articles = await pagination(Article).find().page(page).size(5).display(2).populate("author").exec()
    //res.send(articles)
    //渲染模板,并展示
    res.render('admin/article',{
         articles:articles
    })
}