$(function () {
    /*
        商品详情页渲染页面  要拿到数据
        1.通过地址栏获取id
        2.调用商品详情的接口  传参数过去 id
    */
    var strUrl = location.href;
    var id = strUrl.slice(strUrl.indexOf("=") + 1);
    var data = null;
    var code = "";
    var margin = 0;
    $.ajax({
        url: '/product/queryProductDetail',
        tpye: 'get',
        async: false,
        data: {
            id: id
        },
        success: (res) => {
            data = res;
            sizeArr = data.size.split("-");
            data.size =sizeArr;
            margin = res.num;
            console.log('我是详情页的数据',data.pic);
            
            var html = template("detailTpl", data);
            $("#detailInfo").html(html);
            mui(".mui-slider").slider({
                interval: 1000
            })
        }
    })

    /* 尺寸，选中样式，跟随 */
    $("body").on("tap", ".item", function () {
        $(this).addClass("active").siblings().removeClass("active");
        code = $(this).text();
        console.log(code);
    }).on("tap", ".clothes-size", function () {
        $(this).addClass("active").siblings().removeClass("active");
        code = $(this).text();
        console.log(code);
    })

    /* 加减联动该商品数量 顺便拿到具体商品数量 */
    // console.log("后面的"+margin);    //没有设置同步的话，读取不到这里的margin。
    var margin = data.num;
    var isNum = $("#num");
    $("body").on("click", "#plus", function () {
        var num = isNum.val();
        num++;
        if (num > margin) {
            num = margin;
            mui.toast("没有更多库存啦");
        };
        isNum.val(num);
    }).on("click", "#minus", function () {
        var num = isNum.val();
        num--;
        if (num < 1) {
            num = 1;
            mui.toast("不能再少啦");
        }
        isNum.val(num);
    })

    /*
        加入购物车
        1.给按钮添加点击事件
        2.拿到用户选择的商品尺码和数量
        3.验证用户有没有选择尺码
        4.调用添加购物车接口，提示一下加入成功跳转到购物车的页面
    */

    $("body").on("click", ".addCart", function () {

        var sizeErr = $(".item.active").html() == "" ? 1 : 0;
        var sizecloErr = $(".clothes-size.active").html() == "" ? 1 : 0;


        if (sizeErr==1 || sizecloErr==1) {
            console.log(sizeErr + sizecloErr);
            mui.toast("请选择尺码");
            return false;
        }

        if (!$("#num").val()) {
            mui.toast("请选择购买数量");
            console.log($("#num").val());
            return false;
        }
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: id,
                num: $("#num").val(),
                size: code
            },
            success: (res) => {
                console.log(res);
                if(res.success){
                    mui.toast("加入成功");
                }else{
                    if(res.error == 400){
                        mui.toast("请先登录哈");
                        setTimeout(()=>{
                            location.href="login.html";
                        },2000)
                    }else{
                        mui.toast(res.message)
                    }
                }
            }
        })
    })

})