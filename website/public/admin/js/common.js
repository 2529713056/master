//传入一个表单,然后处理这个表单,返回一个对象
//{email: "11@qq.com", password: "123456"}
function serializeToJson(form)
{
    var f = form.serializeArray()
    var result = {}
    f.forEach(function (item) {
        result[item.name] = item.value
    })
    return  result
}