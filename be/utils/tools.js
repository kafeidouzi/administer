const bcrypt = require('bcrypt')

module.exports = {

    //密码加密操作
    //传入输入的密码
    crypt(myPlaintextPassword){
        //封装一个promise用于方便返回加密后的密码
        return new Promise((resolve,reject)=>{
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(myPlaintextPassword,salt,(err,hash)=>{
                    resolve(hash)
                })
            })
        })
    },
    compare(myPlaintextPassword,hash){
        return new Promise((resolve,reject)=>{
            bcrypt.compare(myPlaintextPassword,hash,function(err,res){
                resolve(res)
            })
        })
    }
}