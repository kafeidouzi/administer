import userView from '../views/user.art'


let _url = ''
let _type=''
export default {
    async render(){
        //封装该函数，不让下边代码放入ajax回调内执行，优雅
        //利用async  await特性
        let result =await this.isSignin()
        //userView是loader返回的函数
        //该函数可以用于路由模板的渲染
        //res.render(userView(req,res),{data})
        //又可以用于直接返回字符串 userView(data),
        //可以直接传参
        //console.log(result.ret)
        let html = userView({
            isSignin:result.ret,
            username:result.data.username
        })
        $('.user-menu').html(html)
        this.bindEventToBtn()
    },
    isSignin(){
        return $.ajax({
            url:'./api/users/isSignin',
            dataType:'json',
            success(result){
                return result
            }
        })
    },

    bindEventToBtn(){
        $('.hidden-xs').on('click',function(){

            _type = $(this).attr('id')
            _url = _type === 'btn-signin'? '/api/users/signin' :'api/users/signup'
            if(_url === 'api/users/signup'){
                $('.navbar-nav> .user-menu>.dropdown-menu>li.user-header').css('height','278px')
            }else{
                $('.navbar-nav> .user-menu>.dropdown-menu>li.user-header').css('height','163px')
            }
            $('input').val('')
        })

        $('#btn-submit').on('click',()=>{
           // let data = $('#inputEmail3').val()
            let data = $('#user-form').serialize()
           // console.log(data)
            $.ajax({
                url :_url,
                type:'POST',
                data,
                success(result){
                    //console.log(result)
                    if(_type === 'btn-signin'){
                        if(result.ret){
                            let html = userView({
                                isSignin:true,
                                username : result.data.username
                            })
                            $('.user-menu').html(html)
                            _type=''
                        }else{
                            alert(result.data.msg)
                        }
                    }else if(_type === 'btn-signup'){
                        if(result.ret){
                            alert('亲，注册成功了哟')
                        }else{
                            console.log(result)
                            alert(result.data.msg)
                        }
                    }
                    else{
                        location.reload()
                    }
                }
            })
        })
        $('.dropdown').on('click','#btn-signout',()=>{
         
            $.ajax({
                url :'/api/users/signout',
                success(result){
                    //console.log(result)
                    location.reload()
                    // if(_type === 'btn-signin'){
                    //     if(result.ret){
                    //         let html = userView({
                    //             isSignin:true,
                    //             username : result.data.username
                    //         })
                    //         $('.user-menu').html(html)
                    //         _type = ''
                    //     }else{
                    //         alert(result.data.msg)
                    //     }
                    // }else if(_type === 'btn-signup'){
                    //     if(result.ret){
                    //         alert('亲，注册成功了哟')
                    //     }else{
                    //         alert(result.data.msg)
                    //     }
                    // }
                    // else{
                        
                    // }
                }
            })
        })
        $('.code').on('click',()=>{
            let data = $('#user-form').serialize()
            $.ajax({
                url:'/api/users/yanzheng',
                type:'post',
                data,
                success(result){
                    alert(result.data.msg)
                }

            })
        })
        $('')
    }

}