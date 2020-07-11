$(function () {
  //确认一下用户是从添加点击进来的，还是从编辑点击进来的
  var isEdit = Number(getParamsByUrl(location.href, 'isEdit'));
  console.log(isEdit);

  if (isEdit) {
    //编辑
    if (localStorage.getItem("editAddress")) {
      var address = JSON.parse(localStorage.getItem("editAddress"));
      console.log(address);
      var html = template("editTpl", address);
      $("#editForm").html(html);
    }
  } else {
    //添加操作
    var html = template("editTpl", {});
    $("#editForm").html(html);
  }

  //给省市区的输入框添加点击事件，把省市区三级联动的组件实例化并且填充数据。

  //创建picker选择器
  var picker = new mui.PopPicker({
    layer: 3
  }); //layer:3  三级联动

  //为picker添加一个数据
  picker.setData(cityData);

  //为输入框添加点击事件，调用picker选择器
  $("#selectCity").on('tap', function () {
    picker.show(function (selectItems) {
      //获取到用户选中的省市区作为input的value
      $("#selectCity").val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
    });
  });

  $("#addAddress").on('tap', function () {
    var recipients = $.trim($("[name='recipients']").val())
    var postCode = $.trim($("[name='postCode']").val())
    var selectCity = $.trim($("[name='selectCity']").val())
    var detail = $.trim($("[name='detail']").val())

    if (!recipients) {
      mui.toast("请输入收货人姓名"); //提示组件
      return;
    }
    if (!postCode) {
      mui.toast("请输入邮政编码"); //提示组件
      return;
    }
    if (!selectCity) {
      mui.toast("请选择省市区"); //提示组件
      return;
    }
    if (!detail) {
      mui.toast("请输入详细收货地址"); //提示组件
      return;
    }

    //提取一下参数 和url type
    var data = {
      recipients: recipients,
      postcode: postCode,
      address: selectCity,
      addressDetail: detail
    }
    if (isEdit) {
      //请求编辑的接口
      var url = "/address/updateAddress";
      data.id = address.id;
    } else {
      //添加接口
      var url = '/address/addAddress';
    }

    $.ajax({
      url: url,
      type: 'post',
      data: data,
      success: function (res) {
        if (res.success) {
          if (isEdit) {
            mui.toast("修改收货地址成功");
          } else {
            mui.toast("添加收货地址成功");
          }
          setTimeout(function () {
            location.href = "address.html";
          }, 1000);
        }
      }
    })
  })
})


function getParamsByUrl(url, name) {
  var params = url.substr(url.indexOf('=') + 1);
  return params;
}