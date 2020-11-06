const joi = require("joi")

//定义对象验证规则
const schema = {
    username: joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    birth:joi.number().min(1900).max(2020).error(new Error('birth属性没有通过验证'))
}

async function run() {
    try {
        //实施验证
        await joi.validate({username: "aa",birth:1990}, schema)
    } catch (ex) {
        console.log(ex.message)
        return
    }
    console.log("验证通过")
}

run()