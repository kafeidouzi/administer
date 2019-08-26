const moment = require('moment')
const posModel = require('../models/position')

module.exports = {
    async list(req,res,next){
        let {list, total} = posModel.find(req.query)
    if (await list) {
       
      res.render('succ', {
        data: JSON.stringify({
          list: await list,
          total: await total
        })
      })
    }
    },
    async save(req,res,next){
        let result = await posModel.save({
            ...req.body,
            companyLogo:req.filename,
            createTime:moment().format('YYYY-MM-DD hh:mm:ss')
        })
        if(result){
            res.render('succ',{
                data:JSON.stringify({
                    msg:'数据添加成功'
                })
            })
        }else{
            res.render('fail', {
              data: JSON.stringify({
                msg: '数据添加失败.'
              })
            })
        }
       
    },
    async findone(req,res,next){
      let result = await posModel.findone(req.body.id)
      if(result){
        res.render('succ',{
          data:JSON.stringify(result)
        })
      }
    },
    async put (req,res,next){
      let result = await posModel.put({
        ...req.body,
        createTime:moment().format('YYYY-MM-DD hh:mm:ss')
      })
      res.render('succ',{
        data:JSON.stringify({
          msg:'数据修改成功.'
        })
      })
    },
    async delete(req,res,next){
      //res.set('content-type','application/json ;charset=utf-8')
      
    let result = await posModel.delete(req.body.id)
      res.render('succ',{
        data:JSON.stringify({
          msg:'数据删除成功'
        })
      })
    },
    async search(req,res,next){
      let {keywords} = req.body
      console.log(0)
      let list = await posModel.search(keywords)
      res.render('succ',{
        data:JSON.stringify({
          list,
          total: -1
        })
      })
    }
}
