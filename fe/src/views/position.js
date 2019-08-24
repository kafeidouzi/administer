import positionView from '../views/position-list.art'
class BBB{
      
  constructor(req,res,next){
    this.res =res
    console.log(1)
    this.init()
  }
  async init(){
    console.log(this)
    let result = await this.dd()

    if(result.ret){
      this.res.render(positionView({
        list:result.data
      }))
    }else{
      this.res.go('/')
    }
  }
  dd(){
    return $.ajax({
      url:'/api/position/list',
      success(result){
        return result
      }
    })
  }
}
export default {
  render(req, res, next) {
    new BBB(req,res,next)
  }
}