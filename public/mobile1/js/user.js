//请求一下用户信息的接口
//保存用户信息
var userInfo = null;
//登录拦截  一定要登录才能跳转到user.html  否则就要先去登录
 $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    //同步
    async:false,
    success:function(res){
        // console.log(res)
        if(res.error&&res.error ==400){
            location.href='login.html'
        }
        userInfo = res;
    }
})
$(function(){
      /*  
        退出登录
        1.获取到退出登录按钮添加点击事件
        2.调用退出登录接口实现退出登录
        3.退出成功 跳转首页
    */
   $("#logout").on("tap",function(){
       $.ajax({
           url:'/user/logout',
           type:'get',
           success:function(res){
            //  console.log(res)
            if(res.success){
                mui.toast("退出登录成功")
                setTimeout(() => {
                    location.href="login.html"
                }, 2000);
            }
           }
       })
   })
    var html = template('userTpl',userInfo)
    $("#userInfo").html(html)
})