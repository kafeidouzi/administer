const nodemailer = require('nodemailer')
const ljtools = require('ljtools')
const userModel = require('../models/users') 

const tools = require('../utils/tools')
const tokenUtil = require('../utils/token')
let {randomNum} = ljtools
      
let num = randomNum(2323,49090)

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
      let {username,password,user_email,code} = req.body
      if(!(code == num)){
        res.render('fail',{
          data:JSON.stringify({
            msg:"验证码输入错误"
          })
        })
        return false
      }
      //从数据库中取出用户信息
      let result =await userModel.findOne(username)
      //判断用户名是否存在
      if(!result){
        
      //密码加密
        let newPassword = await tools.crypt(req.body.password)
     //将数据保存到数据库
      await userModel.save({
            username,
            password:newPassword,
            user_email:user_email,
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
      }else{
        res.render('fail',{
          data:JSON.stringify({
              msg:'用户名已存在'
          })
      })
      }
     
      

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
          //req.session.username = username
          let token = tokenUtil.sign({
            username
          })
          res.set('x-access-token',token)
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
     // let username = req.session.username
     let token = req.get('x-access-token')
     let result = await tokenUtil.verify(token)
     //console.log(token)
      //console.log(req.url)
      if(result){
        // if(req.url === '/list'){
        //   next()
        // }else{
          res.render('succ',{
            data:JSON.stringify({
              msg:'用户有权限',
              username:result.username
            })
          })
       
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
    },
    async yanzheng(req,res,next){
      let email = req.body.user_email;
     
      //console.log(num)
//创建发送邮件对象
let transporter = nodemailer.createTransport({
    host:"smtp.qq.com",//发送方邮箱，通过node——modules/nodemailer/lib/well-konw/service.js查找
    port :"465",//端口号
    secure:true,//true for 465，其他为false
    auth:{
        user:'541245636@qq.com',//发送方邮箱
        pass:'ugpdblbjkleubfda'//smtp 验证码
    }
}); 
//邮件信息
let mailobj ={
    from:'"Fred Foo  jj"541245636@qq.com',
    to:email,//接收地址
    subject:"你好，我是刘猛", //标题
    text:JSON.stringify(num), //文本内容
    //html:"<p>刘彪彪</p>"//页面内容，二者选其一
}

//发送邮件
transporter.sendMail(mailobj,(err,data)=>{
    console.log(err)
    console.log(data)
});
res.set('content-type','application/json;charset=utf-8')
res.render('succ',{
  data:{
    msg:"发送成功"
  }
})
    }

}