var page=1; 
var html="";
var keyword=getParamsByUrl(location.href,'keyword')
//价格排序规则  默认升序
var priceSort=1;
$(function(){

    //上啦加载更多
    mui.init({
        pullRefresh : {
          container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
             callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      })

       /*
          按照价格排序
         1.对这个价格按钮添加点击事件
         2.将价格排序的规则作为参数传递到接口中
         3.对之前的各种配置进行初始化
           页面的数据清空
           恢复当前的页码page为1
           重启一下我们的上啦加载更多
        4.将排序好的结果给到模板引擎重新展示到页面

       */
      $("#priceSort").on('tap',function(){
          //更改价格排序的规则
          priceSort = priceSort===1?2:1
          //对之前的各种配置进行初始化
          html="";
          page=1;
          mui('#refreshContainer').pullRefresh().refresh(true);
          getData();
      })





    /*
     根据用户输入的关键字来发请求获取搜索结果
         1.获取到地址栏种获取用户输入关键字
         2.用关键字来调取接口数据
         3.将搜索结果的数据通过模板引擎渲染到页面
    */
 function getData(){
   //2.用关键字调取我们的接口
   var that = this
   $.ajax({
       url:'/product/queryProduct',
       type:'get',
       data:{
           page:page++,
           pageSize:3,
           proName:keyword,//就会把所有有关关键字的数据请求回来
           price:priceSort
       },
       success:function(res){
          console.log(res)
        if(res.data.length>0){
             html += template('search-list',res)
            $("#search-box").html(html)
           //告诉上啦加载组件当前数据已经加载完毕
           that.endPullupToRefresh(false);
           return;
        }else{
            that.endPullupToRefresh(true);
        }
       }

   })
 }
})
//获取关键字
function getParamsByUrl(url,name){
    var params = url.substr(url.indexOf("=")+1);
    return params;
}








