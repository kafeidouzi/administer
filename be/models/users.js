const mongoose = require('../utils/db')
const Users= mongoose.model('users',{
    username:String,
    password:String,
    user_email:String
})
 
module.exports = {
    //解构赋值传参
    save({username,password,user_email}){
        const users = new  Users({
            username,
            password,
            user_email,
        })
        return users.save()
    },
    //model.findOne()方法
    findOne(username){
       return Users.findOne({username})
    }
}