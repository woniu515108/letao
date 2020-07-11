
$(function(){
    /*
      获取到用户储存的收货地址
    */
   //储存收货地址的数组
  var  address=null;
   $.ajax({
       url:'/address/queryAddress',
       type:'get',
       success:function(res){
           console.log(res)
           address = res
           var html = template("addressTpl",{result:res})
           $("#address-box").html(html)
       }
   })
      /*
        删除收货地址
        1.给这个删除按钮添加点击事件
        2.弹出一个删除确认框
        3.如果用户点击确认 删除  点击取消 不删除 滑回去
        4.调用删除收货地址的接口 完成删除功能
        5.刷新当前页面 从新请求最新的收货地址接口
     */

     $("#address-box").on("tap",".delete-btn",function(){
        
         var id = this.getAttribute('data-id')
         var li = this.parentNode.parentNode;
         mui.confirm("确认要删除嘛？",function(message){
            // console.log(message)
            if(message.index==1){
               //删除收货地址
               $.ajax({
                   url:'/address/deleteAddress',
                   type:'post',
                   data:{
                       id:id
                   },
                   success:function(res){
                    //    console.log(res)
                    //删除成功从新加载页面
                    if(res.success){
                        location.reload();
                    }
                   }
               })
            }else{
                //点击取消按钮 关闭列表滑出效果
                mui.swipeoutClose(li)
            }
         })
     })

     /*
       编辑收货地址 
       1.给编辑按钮添加点击事件
       2.跳转到收货地址编辑页面并且将编辑的数据传递到这个页面
       3.将数据展示在页面中
       4。给确认按钮添加点击事件
       5.调用接口执行编辑操作
       6.编辑成功 跳转回收货地址列表页面
    */

    $("#address-box").on("tap",".edit-btn",function(){
    //    console.log(address)
         var id = this.getAttribute('data-id');
         for(var i=0;i<address.length;i++){
             if(address[i].id == id){
                 //对象转换成数组
                 localStorage.setItem("editAddress",JSON.stringify(address[i]))
                 break;
             }
         }
         location.href = "addAddress.html?isEdit=1"
    })



})