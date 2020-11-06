const mongoose = require("mongoose")
//创建集合规则
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        maxlength:20,
        minlength:4,
        required:[true,'请填写文章标题']
    },
    author:{
        //集合的关联.  一个集合关联了另一个集合
        //文章(article)的author是一个id值. 这个值来源于User集合
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'请传递作者']
    },
    publishDate:{
        type:Date,
        default:Date.now
    },
    //封面
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String
    }
})
//创建集合
const Article = mongoose.model('Article',articleSchema)

//导出文章集合
module.exports = {
    Article
}