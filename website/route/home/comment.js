//评论集合构造函数
const {Comment} =  require('../../model/comment')
module.exports =async (req,res)=>{
    //接受评论参数
    const {uid,aid,content}=req.body
    //写入数据库
    await Comment.create({
        content:content,
        uid:uid,
        aid:aid,
        time:new Date()
    })
    //重定向回文章详情
    res.redirect("/home/article?id="+aid)
}