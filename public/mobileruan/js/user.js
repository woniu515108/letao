//保存用户信息
var userInfo = null;

$.ajax({
  url: '/user/queryUserMessage',
  type: 'get',
  async: false, //同步，要先请求完用户信息，才可以登出
  success: function (res) {
    //登录拦截
    if(res.error && res.error==400){
      location.href="login.html";
    }
    userInfo = res;
    // console.log(userInfo);
  }
})


$(function () {

  /*  
    退出功能：
    1.获取退出登录按钮添加点击事件
    2.调用退出登录接口实现退出登录
    3.退出成功 跳转首页
  */

  $("#logout").on('tap', function () {
    $.ajax({
      url: '/user/logout',
      type: 'get',
      success: function (res) {
        // console.log(res);
        if (res.success) {
          mui.toast("退出登录成功");
          setTimeout(() => {
            location.href = "login.html";
          }, 2000)
        }
      }
    })
  })

  var html = template('userTpl', userInfo);
  $("#userInfor").html(html);
})