$(function () {
  //获取所有的收货地址 传到模板引擎 渲染页面
  //储存收获地址的数组
  var address = null;
  //发送请求拿到所有的收货地址
  $.ajax({
    url: '/address/queryAddress',
    type: 'get',
    success: function (res) {
      // console.log(res);
      address = res;
      var html = template('addressTpl', {
        result: address
      });
      $("#address-box").html(html);
    }
  })

  /*
    删除收货地址
    1.给删除按钮添加点击事件
    2.弹出一个删除确认框
    3.如果用户点击确认按钮，则删除；点击取消，不删除，并让滑块恢复原来的样子
    4.调用一下删除收货地址的接口，完成删除需求
    4.刷新当前页面，重新发请求去查询所有的收货地址
  */

  $("#address-box").on("tap", ".delete-btn", function () {
    //先获取你这个删除按钮的id  然后再作为参数传过去  指定删除这个id的这条收货地址
    var id = $(this).attr("data-id");
    // console.log(id);
    var li = this.parentNode.parentNode; //获取li父级的父级
    //弹出确认框
    mui.confirm("确认删除该条地址？", (message) => {
      if (message.index == 1) {
        $.ajax({
          url: '/address/deleteAddress',
          type: 'post',
          data: {
            id: id
          },
          success: (res) => {
            // console.log(res);
            if (res.success) {
              //删除成功，则重新加载本页面，实时获取最新的收货地址
              location.reload();
            }
          }

        })
      } else {
        //取消删除，滑块则回到原来的样子
        mui.swipeoutClose(li);
      }
    });
  }) 

  /*
    编辑收货地址
    1.给编辑按钮添加点击事件
    2.跳转到收货地址管理页面并且将编辑的数据传递到收货地址管理页面
    3.把传过来的数据展示在输入框中，再进行修改
    4.给确认按钮添加点击事件，发送请求一下编辑的接口
    5.编辑成功后，跳转回收货地址列表页，实时获取最新的收货地址
  */

  $("#address-box").on("tap", ".edit-btn", function () {
    // console.log(address);
    var id = $(this).attr("data-id");
    for (var i = 0; i < address.length; i++) {
      if (address[i].id == id) {
        //对象转换成字符串  localStorage只能存字符串，setItem(key,value)
        localStorage.setItem("editAddress", JSON.stringify(address[i]));
        break;

      }
    }
    //跳转页面
    location.href = "addAddress.html?isEdit=1";
  })

})