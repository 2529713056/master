//直接将这个箭头函数导出
module.exports= (req, res) => {
    //res.send("欢迎来到博客管理页面")
    res.render('admin/login')
}