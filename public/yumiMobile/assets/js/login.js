$(function(){
    $('#login-btn').on('tap',function(){
        var username=$.trim($('[name="username"]').val());
        var password=$.trim($('[name="password"]').val());
        console.log(username,password)
        if(!username){
            mui.totast('请输入用户名');
            return;
        }
        if(!password){
            mui.totast('请输入密码');
            return;
        }
        $.ajax({
            url:'/user/login',
            type:'post',
            dataType:'json',
            data:{
                username, 
                password
            },
            beforeSend(){
                $('#login-btn').html('正在登录...')
            },
            success: function(res) {
                console.log(res);
                if(res.success){
                    mui.toast('登录成功');
                    setTimeout(function(){
                        location.href='user.html'
                    },2000)
                }else{
                    mui.toast(res.message);
                }
            }
        })
        
    })
})