const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test1', { useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log('数据连接失败' + err))

// 文章集合规则
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// 用户集合规则
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobbies: String
})

// 文章集合
const post = mongoose.model('Post', PostSchema)
// 用户集合
const user = mongoose.model('User', UserSchema)

// 创建用户
user.create({ name: 'zhangsan', age: 20, hobbies: '11111' })
    .then(res => console.log(res))
    .catch(err => console.log(err))

// // 创建文章
post.create({ title: '测试测试', content: '内容内容内容内容', author: '5d34f0542fdc3f7924249a9c' })
    .then(res => console.log(res))
    .catch(err => console.log(err))

// 查询
post.find().populate('author').then(res => console.log(res))