const mongoose = require("mongoose")
//导入加密模块
const bcrypt = require("bcrypt")
//导入验证模块
const joi = require("joi")
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        //在数据库中,该字段的值必须唯一.如果重复,无法插入数据库
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //admin 超级管理员
    //normal 普通用户
    role: {
        type: String,
        required: true
    },
    //0  启用状态
    //1  禁用状态
    state: {
        type: Number,
        default: 0
    }
})
//创建用户集合
const User = mongoose.model("User", userSchema)

//创建用户,并且进行加密
async function createUser() {
    //随机数
    const salt = await bcrypt.genSalt(10)
    //对123456这个密码进行加密
    const pass = await bcrypt.hash('123456', salt)

    //使用加密后的密码
    await User.create({
        username: "lily",
        email: "lily@qq.com",
        password: pass,
        role: "admin",
        state: 0
    }).then(() => {
        console.log("数据插入成功")
    }).catch((err) => {
        console.log("数据插入失败")
    })
}

//调用一次
//createUser()

//创建一个用户.  用完后注释
// User.create({
//     username:"xiaoming",
//     email:"xiaoming@qq.com",
//     password:"123456",
//     role:"admin",
//     state:0
// }).then(()=>{console.log("数据插入成功")})

//因为验证的是用户的数据格式,所以放入这个用户的model中
//定义一个函数,用于校验数据.并且导出
const validateUser = user => {
    //定义规则
    const schema = {
        username:joi.string().min(2).max(20).required().error(new Error('用户名不符合验证规则')),
        email:joi.string().email().required().error(new Error('邮箱格式不符合验证规则')),
        password:joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合验证规则')),
        //取值范围
        role:joi.string().valid("normal","admin").required().error(new Error('角色值非法')),
        state:joi.number().valid(0,1).required().error(new Error('状态值非法'))
    }
    //进行校验. 返回校验结果
    return joi.validate(user,schema)
}

//将集合导出,给别的模块
module.exports = {
    //如果对象的键和值名字相同,那么可以只写一个
    User,
    validateUser
}