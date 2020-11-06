//导入文章集合
const {Article} = require("../../model/article")
//导入分页使用的模块
const pagination = require("mongoose-sex-page")

module.exports = async (req,res)=>{
    //获取当前页码
    const page = req.query.page
    //从数据库中读取所有的文章,展示
    let result = await pagination(Article).find().page(page).size(4).display(3).populate("author").exec()

    //res.send(result)
    res.render('home/default',{
        result:result
    })
}