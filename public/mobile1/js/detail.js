$(function(){
    //库存数量
    var kucunNum = 0
    //产品id
    var id = getParamsByUrl(location.href,'id')

    //  var msg=null;
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        async:false,   //把请求回来的数据能够让外部去调用 先把ajax搞成同步 在请求体外面创建一个全局变量接受我这个请求的数据
        data:{
            id:id
        },
        success:function(res){
            console.log(res)
            kucunNum = res.num
            var html=template("productTpl",res)
            $(".product-box").html(html)
            var gallery = mui('.mui-slider')
            gallery.slider({
                interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
            })
        }
    })

    $(".product-box").on("tap",".size span",function(){
        // console.log(1111)
        $(this).addClass('active').siblings('span').removeClass('active')
    })

    var oInp = $("#inp");
    $("#increase").on("tap",function(){
        var num = oInp.val()
        num++;
        if(num>kucunNum){
            num=kucunNum
            mui.toast("没有库存啦")
        }
        oInp.val(num)
    })

    $("#reduce").on("tap",function(){
        var num = oInp.val()
        num--;
        if(num<1){
            num=1
        }
        oInp.val(num)
    })


    /*
       加入购物车
       1.添加点击事件
       2.进行简单的验证 一定要用户选择尺码和数量
       3.拿到用户的选择的尺码和数量
       4.发请求并携带参数
       5.页面跳转到购物车页面
    */ 

    $("body").on("tap",".btn_addCart",function(){
        // console.log(1111)
        if(!$(".btn_size.active").html()){
            mui.toast("请选择尺码")
            return false;
        }
        if(!$("#inp").val()){
            mui.toast("请选择数量")
            return false;
        }
        mui.confirm('选择成功，是否添加到购物车？','温馨提示',['是','否'],function(e){
            if(e.index==0){
                $.ajax({
                    url:'/cart/addCart',
                    type:'post',
                    data:{
                        productId:id,
                        num:$("#inp").val(),
                        size:$(".btn_size.active").html()
                    },
                    success:function(res){
                        if(res.success){
                             location.href="cart.html"
                        }else if(res.message=="未登录！"){
                            mui.toast(res.message)
                            setTimeout(function(){
                                location.href="login.html"
                            },2000)
                        }
                    }
                })
            }
        })
    })

  
})

//获取关键字
function getParamsByUrl(url,name){
    var params = url.substr(url.indexOf("=")+1);
    return params;
}
