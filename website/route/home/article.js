//导入文章集合
const {Article} = require("../../model/article")
//导入评论集合
const {Comment} =  require('../../model/comment')
module.exports =async (req,res)=>{
    // 1.接受传递过来的id参数
    const id = req.query.id
    // 2.从数据库中查询这个id对应的文章
    let article = await Article.findOne({_id:id}).populate("author")
    //查询评论. 通过当前的文章id,查询它的评论
    let comments =  await Comment.find({aid:id}).populate("uid")
    // res.send(article)
    // 3.将这个文章渲染到浏览器
    res.render('home/article',{
        article,  //如果对象中键值名相同,那么写一个就够了
        comments
    })

    //res.send("欢迎来到博客详情页")
}