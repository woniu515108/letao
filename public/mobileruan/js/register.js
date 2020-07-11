$(function(){
  /*
    用户注册
    1.给那个注册按钮添加点击事件
    2.获取到用户输入的信息
    3.对用户输入的信息进行简单的验证
    4.调用注册接口
    5.注册成功提示一下 跳转到登陆页面
  */
//注册
$("#register-btn").on('tap',function(){
  var username=$.trim($("[name='username']").val());
  var mobile=$.trim($("[name='mobile']").val());
  var password=$.trim($("[name='password']").val());
  var vpassword=$.trim($("[name='vpassword']").val());
  var vCode=$.trim($("[name='vCode']").val());

  if(!username){
    mui.toast("请输入用户名");
    return;
  }
  if(!/^1[3-9]\d{9}$/.test(mobile)){
    mui.toast("请输入合法的手机号码");
    return;
  }
  if(password != vpassword){
    mui.toast("两次输入不一致，请重新输入");
    return;
  }
  if(!/^\d{6}$/.test(vCode)){
    mui.toast("请输入合法的验证码");
    return;
  }
  $.ajax({
    url:'/user/register',
    type:'post',
    data:{
      username:username,
      password:password,
      mobile:mobile,
      vCode:vCode
    },
    success:function(res){
      // console.log(res);
      mui.toast("注册成功！");
      setTimeout(function(){
        location.href="login.html";
      },2000);
    }
  })
})

 //获取验证码
 $("#vCode").on("tap",function(){
   $.ajax({
     url:'/user/vCode',
     type:'get',
     success:function(res){
      console.log(res.vCode);
     }
   })
 })
})

