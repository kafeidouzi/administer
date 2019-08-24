const mongoose = require('../utils/db')
const Users= mongoose.model('users',{
    username:String,
    password:String
})
 
module.exports = {
    //解构赋值传参
    save({username,password}){
        const users = new  Users({
            username,
            password
        })
        return users.save()
    },
    //model.findOne()方法
    findOne(username){
       return Users.findOne({username})
    }
}