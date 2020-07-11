$(function(){
    //  确定你是从添加点进来还是从编辑点进来的
     var isEdit = Number(getParamsByUrl(location.href,'isEdit'))  
    //   console.log(isEdit)

    if(isEdit){
        //编辑操作
        if(localStorage.getItem("editAddress")){
             var address = JSON.parse(localStorage.getItem("editAddress"))
             console.log(address)
             var html = template("editTpl",address)
             $("#editForm").html(html)
        }
    }else{
        //添加操作
        var html = template("editTpl",{})
        $("#editForm").html(html)
    }


       //创建一个picker选择器
       var picker = new mui.PopPicker({layer:3})
       //为picker选择器添加数据
       picker.setData(cityData)

       $("#selectCity").on("tap",function(){
         picker.show(function(selectItems){
            // console.log(selectItems[0].text)
            // console.log(selectItems[1].text)
            // console.log(selectItems[2].text)
            $("#selectCity").val(selectItems[0].text+selectItems[1].text+selectItems[2].text)
         })
       })

      /*添加收货地址
        1.给添加按钮添加点击事件
        2.获取用户输入的表单信息
        3.对用户输入的信息进行简单的验证
        4.调用添加收货地址的接口 实现功能
        5.提示添加成功 跳转到收货地址列表页面
      */

      $("#addAddress").on("tap",function(){
        var username = $.trim($("[name='username']").val());
        var postCode = $.trim($("[name='postCode']").val());
        var city = $.trim($("[name='city']").val());
        var detail = $.trim($("[name='detail']").val());

        if(!username){
            mui.toast("请输入收货人姓名");
            return;
        }
        if(!postCode){
           mui.toast("请输入邮政编码");
           return;
       }
       if(!city){
           mui.toast("请输入省市区");
           return;
       }
       if(!detail){
          mui.toast("请输入详细地址");
          return;
      }
     var  data={
        address:city,
        addressDetail:detail,
        recipients:username,
        postcode:postCode
      };
      if(isEdit){
          //编辑接口
          var url="/address/updateAddress"
          data.id = address.id
      }else{
          //添加操作
          var url="/address/addAddress"
      }

      $.ajax({
          url:url,
          type:'post',
          data:data,
          success:function(res){
             if(res.success){
                if(isEdit){
                    mui.toast("修改地址成功")
                }else{
                    mui.toast("添加地址成功")
                }
                 setTimeout(function () { 
                     location.href="address.html"
                  },2000)
             }
          }
      })

    })


})
//获取关键字
function getParamsByUrl(url,name){
    var params = url.substr(url.indexOf("=")+1);
    return params;
}
