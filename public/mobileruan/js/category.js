$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //请求一级分类的数据
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        dataType: 'json',
        success: (res) => {
            // console.log(res);
            var html = template("category-first", {
                result: res.rows
            })
            $("#links").html(html);
            //如果一级分类有数据的话
            if (res.rows.length) {
                $("#links").find("a").eq(0).addClass("active")
                //获取一级分类的id
                var id = res.rows[0].id;
                //根据一级分类的id去获取对应的耳机分类的数据
                $.ajax({
                    url: '/category/querySecondCategory',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id: id
                    },
                    success: (res) => {
                        // console.log(res);
                        var html = template("category-second", res)
                        $("#brand-list").html(html);
                    }
                })
            }
        }
    })

    //点击一级分类获取指定二级分类的数据
    //1.一级分类添加点击事件   移动端轻敲事件  tap
    $("#links").on("tap", "a", function () {
        //2.获取当前一级分类的定义id
        var id = $(this).attr("data-id");
        //点击添加选中效果
        $(this).addClass("active").siblings().removeClass("active");
        //3.根据一级查找二级 用模板引擎渲染
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id
            },
            success: (res) => {
                var html = template("category-second", res)
                $("#brand-list").html(html);
            }
        })
    })

})