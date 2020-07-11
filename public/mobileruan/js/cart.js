$(function () {
    var size="";
    var cartdatas =[];
    mui('#refreshContainer').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    /* 购车下拉刷新 */
    mui.init({
        pullRefresh: {
            container: '#refreshContainer',
            down: {
                auto: true,
                callback: getCartData
            }
        }
    });

    
    /* 获取购物车数据 */
    function getCartData() {
        var that = this;
        $.ajax({
            url: '/cart/queryCart',
            type: 'get',
            success: (res) => {
                //登录拦截 一定要登陆了才才能进入购物车也米娜并且又数据
                cartdatas = res;
                // console.log(cartdatas);
                if (cartdatas.error == 400) {
                    mui.toast("请先登录哈");
                    setTimeout(() => {
                        location.href = "login.html";
                    }, 2000)
                } else {
                    setTimeout(() => {
                        that.endPulldownToRefresh();
                    }, 1000)
                    var html = template("cartTpl", {
                        result: cartdatas
                    });
                    $("#cart-box").html(html);
                }
            }
        })
    }



    /* 购物车刷新 */
    $("body").on('tap', '.mui-icon-refreshempty', function () {
        /*刷新*/
        mui('#refreshContainer').pullRefresh().pulldownLoading();
    });
    /**------------------------------------------------------------------------------------ */
    /* 编辑购物车数据 */

    $('body').on('tap', '.delete-btn', function () {
        //先获取你这个删除按钮的id  然后再作为参数传过去  指定删除这个id的这条购物车信息
        var id = $(this).attr("data-id");
        // console.log(id);
        var li = this.parentNode.parentNode; //获取li父级的父级
        mui.confirm('你要删除这件商品吗？', '温馨提示', ['确定', '取消'], function (e) {
            if (e.index == 0) {
                $.ajax({
                    url: '/cart/deleteCart',
                    type: 'get',
                    data: {
                        id: id
                    },
                    success: (res) => {
                        // console.log(res);
                        if (res.success) {
                            location.reload();
                        }
                    }
                })
            } else {
                mui.swipeoutClose(li);
            }
        })
    }).on("tap", ".edit-btn", function () { //存单条购物车数据到localstorage中

        // console.log(cartdatas);
        var li = this.parentNode.parentNode;
        var id = $(this).attr("data-id");
        // console.log("id:" + id);
        for (var key in cartdatas) {
            if (cartdatas[key].id == id) {
                localStorage.setItem("updateCart", JSON.stringify(cartdatas[key]));
                break;
            }
        }
        // console.log(res);
        // var html = template('cartUpdateTpl',).replace(/\n/g,' ');
        // mui.confirm();
    }).on('tap', '.edit-btn', function (e) {
        // 修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
        e.detail.gesture.preventDefault();

        var li = this.parentNode.parentNode;
        //     //获取id对应的购物车数据
        var cartdata = JSON.parse(localStorage.getItem("updateCart"));
        sizeArr = cartdata.productSize.split("-");
        cartdata.productSize = sizeArr;

        // console.log(cartdata.id, cartdata.size, cartdata.productSize, cartdata.num, cartdata);

        var html = template('cartUpdateTpl', {
            model: cartdata
        }).replace(/\n/g, ' ');
        // console.log(html);

        mui.confirm(html, '编辑商品', ['确定', '不改了'], function (e) {
            
            if (e.index == 0) {
                
                newCartData = {
                    id: cartdata.id,
                    size: size,
                    num: $("#num").val(),
                }
                // console.log("aaaaaa",newCartData);
                if (!size) {
                    mui.toast('请选择尺码');
                    return false;
                }
                if (!$("#num").val()) {
                    mui.toast('请选择数量');
                    return false;
                }
                $.ajax({
                    url: '/cart/updateCart',
                    type: 'post',
                    data: newCartData,
                    success: (res) => {
                        // console.log(res);
                        mui.toast('编辑成功');
                        mui.swipeoutClose(li);
                        //用一个或多个其他对象来扩展一个对象，返回被扩展的对象  extend()
                        $.extend(cartdata, {
                            cartdata,
                            newCartData
                        });
                        $(li).find('.num').html(newCartData.num);
                        $(li).find('.size').html(newCartData.size);
                        mui('#refreshContainer').pullRefresh().pulldownLoading();
                    }
                })
            } else {
                mui.swipeoutClose(li);
            }
        })
    // }).on("tap", ".item", function () {
    //     $(".item").addClass("active").siblings().removeClass("active");
    //     newCartData.size = $(this).text();
    //     console.log("size" + newCartData.size);
        // }).on("tap", ".clothes-size", function () {
        //     $(".clothes-size").addClass("active").siblings().removeClass("active");
        //     cartdata.size = $(this).text();
        //     console.log("closize" + cartdata.size);

    }).on('tap', '.clothes-size', function () {
        var $this = $(this);
        $('.clothes-size').removeClass('active');
        $this.addClass('active');
        // console.log('我是按钮',$this.text())
        
        size=$this.text();
        console.log(size);s
    }).on('tap', '.item', function () {
        var $this = $(this);
        $('.item').removeClass('active');
        $this.addClass('active');
        
        size=$this.text();
    }).on('tap', '.num span', function () {
        var $this = $(this),
            $input = $('.num input');
        var num = parseInt($input.val()),
            max = $input.attr('data-max');
        if ($this.hasClass('minus')) {
            num > 0 && $input.val(num - 1);
        }
        if ($this.hasClass('plus')) {
            if (num < max) {
                $input.val(num + 1);
            } else {
                mui.toast('小店没有芥末多库存哦');
            }
        }
        // }).on('change', 'input[type="checkbox"]', function () {
        //     setAmount();
        // });

        /**---------------------------------------------------------------- */
        // }).
    })
})