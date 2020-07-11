$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });



    //请求一级分类数据
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        dataType:'json',
        success:function(res){
            console.log(res);
            //所谓的模板引擎作用就是用来帮我们将请求回来的数据和html进行拼接
            //将拼接好之后的结果 返回给我们  让我们直接拿这个结果区渲染页面

            //将数据和html拼接
            //参数1 html模板的id
            //参数2 数据
            //告诉模板引擎 html模板和数据怎样进行拼接
            var html = template('category-first',{result:res.rows})
            $("#links").html(html)
            //如果一级分类有数据的话
            if(res.rows.length){
                $("#links").find('a').eq(0).addClass('active');
                //获取第一个一级分类的id
                var id=res.rows[0].id;
                //根据一级分类的id获取对应的二级分类的数据
                $.ajax({
                    url:'/category/querySecondCategory',
                    type:'get',
                    data:{
                        id:id
                    },
                    success:function(res){
                        console.log(res)
                        var html=template("category-second",res)
                        $("#brand-list").html(html)
                    }
                })
            }
        }
    })

    //点击一级分类获取二级分类的数据
    //1.给一级分类添加点击事件
    $("#links").on('tap','a',function(){
        // alert(111111)
        //2.获取当前一级分类的id
        var id=$(this).attr("data-id")
        console.log(id)
        //选中效果
      $(this).addClass('active').siblings().removeClass('active')
        //3.请求接口数据
        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            data:{
                id:id
            },
            success:function(res){
               console.log(res)
               var html = template('category-second',res)
               $("#brand-list").html(html)
            }
        })

    })
})