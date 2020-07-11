$(function () {
    $("body").on("tap", "#editPwd-btn", function () {
        var oldPassword = $.trim($("[name='oldPassword']").val());
        var newPassword = $.trim($("[name='newPassword']").val());
        var vPassword = $.trim($("[name='vPassword']").val());
        var vCode = $.trim($("[name='vCode']").val());
        if(!oldPassword){
            mui.toast("请输入原密码");
            return;
        }
        if(!/^[\w_-]{6,16}$/.test(newPassword)){
            mui.toast("请输入6~16位密码");
            return;
        }
        if(vPassword != newPassword){
            mui.toast("两次密码不一致");
            return;
        }
        if(!/^\d{6}$/.test(vCode)){
            mui.toast("请输入6位验证码");
            return;
        }
        $.ajax({
            url:'/user/updatePassword',
            type:'post',
            data:{
                oldPassword:oldPassword,
                newPassword:newPassword,
                vCode:vCode
            },
            success:(res)=>{
                if(res.success){
                    mui.toast("密码修改成功");
                    setTimeout(()=>{
                        location.href="login.html"
                    });
                }else{
                    mui.toast(res.message);
                }
            }
        })
    // }).on("tap",".getCode",function(){
    //     $.ajax({
    //         utl:'/user/vCodeForUpdatePassword',
    //         type:'get',
    //         success:(res)=>{
    //             console.log(res.vCode);
    //         }
    //     })
    // })
    }).on('tap','.getCode',function(){
        var btn = $('.getCode');
        if(btn.hasClass('btn_disabled')) return false;
        $.ajax({
            type:'get',
            url:'/user/vCodeForUpdatePassword',
            data:'',
            dataType:'json',
            beforeSend:function(){
                btn.addClass('btn_disabled').html('正在发送...');
            },
            success:function(data){
                console.log(data.vCode);
                var time = 60;
                btn.html(time+'秒后再获取');
                var timer = setInterval(function(){
                    time --;
                    btn.html(time+'秒后再获取');
                    if(time <= 0) {
                        clearInterval(timer);
                        btn.removeClass('btn_disabled').html('获取认证码');
                    }
                },1000);
            }
        });
    });
})