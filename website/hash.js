const bcrypt =   require("bcrypt")
async  function run() {
    //genSalt接受一个值作为参数
    //数值越大,生成随机字符串复杂度越高
    //数值越小,生成随机字符串复杂度越低
    //默认值是10
    //返回生成的随机字符串
    const salt  = await  bcrypt.genSalt(10)
    console.log(salt)
    //对密码进行加密
    //123456  密码明文
    //salt    随机字符串
    //返回加密的结果
    const result = await bcrypt.hash('123456',salt)
    console.log(result)
}

run()