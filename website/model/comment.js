const mongoose = require("mongoose")
//创建集合规则
const commentSchema = new mongoose.Schema({
    // 评论人的用户ID
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //评论的文章id
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    //评论时间
    time:{
        type:Date
    },
    //评论内容
    content:{
        type:String
    }
})

//创建评论集合
const Comment = mongoose.model('Comment',commentSchema)
//导出
module.exports = {
    Comment
}