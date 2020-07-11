$(function () {
  /*
    用户登录
    1.获取登录按钮 添加点击事件
    2.获取用户输入得账号和密码，并输入验证
    3.调用登录接口，实现登录功能
    4.登录成功要提示用户  跳转到会员中心页面
  */
  $("#login-btn").on('tap', function () {
    var username = $.trim($("[name='username']").val())
    var password = $.trim($("[name='password']").val())
    // console.log(username)
    // console.log(password)
    if (!username) {
      mui.toast("请输入用户名"); //提示组件
      return;
    }
    if (!password) {
      mui.toast("请输入密码");
      return;
    }
    //发请求
    $.ajax({
      url: '/user/login',
      type: 'post',
      data: {
        username: username,
        password: password
      },
      beforeSend: function () {
        // setTimeout(function(){
        $("#login-btn").html("正在登录……");
        // },500)
      },
      success: function (res) {
        if (res.success) {
          $.ajax({
            url: '/user/queryUserMessage',
            type: 'get',
            async: false,
            success: (data) => {
              if (data.isDelete == 1) {
                mui.toast("登陆成功")
                setTimeout(function () {
                  location.href = "user.html"
                }, 2000)
              } else {
                $("login-btn").html("登录");
                mui.toast("用户已被禁用");
              }
            }
          })
        } else{
          console.log(res);
          mui.toast(res.message);
          $("#login-btn").html("登录");
        }
      }
    })
  })
})