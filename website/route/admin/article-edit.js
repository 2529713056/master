module.exports = (req,res)=>{
    //所有模板都可以使用的变量
    req.app.locals.currentLink = 'article'
    res.render('admin/article-edit')
}