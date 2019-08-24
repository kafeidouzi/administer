const userModel = require('../models/users') 

const tools = require('../utils/tools')

module.exports = {
    async signup(req,res,next) {
      //设置头部，高速前端解析为json字符串
      res.set('content-type','application/json;charset=utf-8')
       // res.send('sigup')
           //    console.log(req.body)
    //    if(username === 'admin' && password ==='123'){
    //        res.send('succ')
    //    }else{  
    //        res.send('fail');
    //    }
      // let {username,password} =req.body

      //从数据库中取出用户信息
      let result =await userModel.findOne(username)
      //判断用户名是否存在
      if(!result){
        let {username,password} = req.body
      //密码加密
        let newPassword = await tools.crypt(req.body.password)
     //将数据保存到数据库
      await userModel.save({
            username,
            password:newPassword
        })

        //给前端返回接口
        //用的express的render方法
        //此处的succ不用引入，在app。js中已经声命了_dirname,只需要写入文件名，
        //会自动找寻文件
        res.render('succ',{
            data:JSON.stringify({
                msg:'用户注册成功'
            })
        })
      }
      res.render('fail',{
        data:JSON.stringify({
            msg:'用户名已存在'
        })
    })
      

      //model里边已经惊醒解构所以可以直接将res.body整个丢进去
    //   let result = await userModel.save(req.body)
    //   console.log(result)
    //   res.json(result)

    },
    async signin(req,res,next){
      //设置头部，高速前端解析为json字符串
      res.set('content-type','application/json;charset=utf-8')
      let {username,password} = req.body
      //从数据库中取出用户信息
      let result =await userModel.findOne(username)
      //console.log(result)
      if(result){
        if(await  tools.compare(password,result.password)){
          req.session.username = username
          res.render('succ',{
            data:JSON.stringify({
              msg:'用户登录成功',
              username
            })
          })
        }else{
          res.render('fail',{
            data:JSON.stringify({
              msg:'用户名或密码错误'
            })
          })
        }
      }else{
        res.render('fail',{
          data:JSON.stringify({
            msg:'用户名或密码错误'
          })
        })
      }
    },
    async isSignin(req,res,next){
      //req.set('content-type','application/json;charset=utf-8')
      let username = req.session.username
      //console.log(req.url)
      if(username){
        if(req.url === '/list'){
          next()
        }else{
          res.render('succ',{
            data:JSON.stringify({
              msg:'用户有权限',
              username
            })
          })
        }
      }else{
        res.render('fail',{
          data:JSON.stringify({
            msg:'用户木权限'
          })
        })
      }
    },
    async signout(req,res,next){
      req.session = null
      
      res.render('succ',{
        data:JSON.stringify({
          msg:'退出成功'
        })
      })
    }
}