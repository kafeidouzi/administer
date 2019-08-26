import positionListView from '../views/position-list.art'
import positionAddView from '../views/position-add.art'
import positionEditView from '../views/position-edit.art'
import _ from 'lodash'

const COUNT = 5
class LoadData{
      
  constructor(pageNo,res){
    pageNo = pageNo
    this.res =res
    this.init(pageNo)
  }
  async init(pageNo){
    let start =pageNo * COUNT
    let result = await this.dd(start)
    
    if(result.ret){
      console.log(result.data)
      this.res.render(positionListView({
        ...result.data,
        showPage:true,
        pageNo,
        pageCount:_.range(Math.ceil(result.data.total/COUNT))
      }))
      
    }else{
      this.res.go('/home')
    }
  }
  dd(start){
    return $.ajax({
      url:'/api/position/list',
      data:{
        start,
        count:COUNT
      },
      success(result){
        return result
      }
    })
  }
}
function loadData(pageNo, res) {
  let start = pageNo * COUNT
  //res.pageNo = pageNo
  $.ajax({
    url: '/api/position/list',
    data: {
      start,
      count: COUNT
    },
    success(result) {
      if (result.ret) {
        res.render(positionListView({
          ...result.data,
          showPage:true,
          pageNo,
          pageCount: _.range(Math.ceil(result.data.total / COUNT))
        }))
      } else {
        res.go('/home')
      }
    }
  })
}
function remove(id,res){
  $.ajax({
    url:'/api/position/delete',
    type:'delete',
    data:{
      id
    },
    success(result){
      console.log(result)
      if(result.ret){
        
        res.go('/position?_='+new Date().getTime())
      }
    }
  })
}
export default {
  render(req, res, next) {
    loadData(0,res)
    //new LoadData(0,res)
    $('#router-view').on('click','#addbtn',()=>{
      
      res.go('/position_add')
    })
   $('#router-view').on('click','.btn-update',function(){
    res.go('/position_edit',{
      id:$(this).attr('data-id')
    })
   })
   $('#router-view').on('click','.btn-delete',function(){
     remove($(this).attr('data-id'),res)
   })

   $('#router-view').on('click','#page li[data-index]',function(){
     //new LoadData($(this).attr('data-index'),res)
    loadData($(this).attr('data-index'),res)
   })
   $('#router-view').on('click',".prev",function(){
     let currtIndex = $('#page li[class="active"]').attr('data-index')
     let index = ~~currtIndex - 1
     if(index > -1){
       loadData(index,res)
     }
   })
   $('#router-view').on('click','.next',function(){
     let currtIndex = $('#page li[class="active"]').attr('data-index')
     let index = ~~currtIndex +1
     if(index < ~~$(this).attr('data-pageCount')){
       loadData(index,res)
     }
   })
   $('#router-view').on('click','#possearch',function(){
     let keywords = $('#keywords').val()
     $.ajax({
       url:'api/position/search',
       type:'post',
       data:{
         keywords
       },
       success(result){
         if(result.ret){
           console.log(result.data)
          res.render(positionListView({
            ...result.data,
            showPage:false
          }))
         }
       }
     })
   })

  },
  add(req,res){
    res.render(positionAddView())
    $('#posback').on('click',()=>{
      res.back()
    })

    $('#possubmit').on('click',()=>{
      $('#posssave').ajaxSubmit({
        url:'/api/position/save',
        type:'post',
        clearForm:true,
        success(result){
          if(result.ret){
            res.back()
          }else{

          }
        }
      })
    })
  },
  edit(req,res){
    $.ajax({
      url:'api/position/findone',
      type:'post',
      data:{
        id:req.body.id
      },
      success(result){
        res.render(positionEditView(result.data))

        $('#posback').on('click',()=>{
          res.back()
        })
        $('possubmit').on('click',()=>{
          $('#posedit').ajaxSubmit({
            url:'/api/position/patch',
            type:'patch',
            success(result){
              if(result.ret){
                res.back()
              }else{

              }
            }
          })
        })
      }
    })
  }
}