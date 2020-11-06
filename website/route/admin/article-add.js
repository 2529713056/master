//引入解析二进制参数的模块
const formidable = require("formidable")
const path = require("path")
//导入文章集合
const {Article} = require("../../model/article")

module.exports = (req,res)=>{
    //res.send("ok")
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm()
    // 2.配置上传文件存放位置
    form.uploadDir = path.join(__dirname,"../","../",'public','uploads')
    // 3.保留上传文件后缀
    form.keepExtensions = true
    // 4.解析表单
    //err     解析失败的错误信息
    //fields  对象.保存了普通的表单数据
    //files   对象.保存了上传文件的信息
    form.parse(req,async (err,fields,files)=>{
        //res.send(fields)
        //res.send(files)
        //这个是我本电脑的绝对路径,那么是不能存入数据库.因为将这个项目拷贝到你的电脑运行,但是你的电脑没有这种图片,就会异常.所以这里使用相对于项目的相对路径
        //这里拿到图片的路径
        //res.send(  files.cover.path.split('public'))

        // 将传输过来的文章,存入数据库
        await Article.create({
            //安住alt,双击,可以选择多个字符
            title:fields.title,
            author:fields.author,
            publishDate:fields.publishDate,
            cover:files.cover.path.split('public')[1],
            content:fields.content
        })
        //重定向到文章列表页面
        res.redirect('/admin/article')
    })
}