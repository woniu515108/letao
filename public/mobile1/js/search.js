$(function(){
    /*
       实现用户点击搜索按钮跳转到搜索结果页面

      1.给搜索按钮添加点击事件
      2.获取到用户输入的搜索关键字
      3.判断用户是否输入了搜索关键字
      4.如果没有输入 阻止跳转 并给出提示
      5.如果用户输入了 跳转到搜索结果页面，并且携带这个关键字到这个页面
    
    */
   $("#search-btn").on("tap",function(){
    //    location.href = "search-result.html"
    //获取到用户输入的搜索关键字
    var keyword=$(this).siblings('input').val();
    // console.log(keyword)
    //判断用户是否输入了搜索关键字
    if(keyword){
        //如果用户输入了 当用户点击按钮 将用户输入的关键字追加数组中
        keyArr.push(keyword)
        //如果用户输入了 将关键字存进localstorage
        localStorage.setItem('keyArr',JSON.stringify(keyArr))
        location.href = "search-result.html?keyword="+keyword
    }else{
        alert("请输入需要搜索商品的名称")
    }
   })

    /*
   实现历史关键字的存储
     1.准备一个存储关键字的数组
     2.当用户点击搜索按钮的时候 将用户输入的关键字追加到数组中
     3.将数组储存到本地存储中
     4.在页面一上来的时候，判断本地存储中是否已经存储的关键字
     5.利用模板引擎将数据和html拼接 将数据展示在页面上
 */
   var keyArr=[];
   if(localStorage.getItem('keyArr')){
     //把这个存储里面的字符串的数据转化成数组，给模板引擎去迭代和渲染页面
      keyArr=JSON.parse(localStorage.getItem('keyArr'))
     console.log(keyArr)
     var html=template("historyTpl",{result:keyArr})
     $("#historyTop").html(html)
   }

   //清空搜索历史
   //给这个按钮添加点击事件
   //清空本地存储里面的数据 清空页面里面的数据
   $("#clear-btn").on('tap',function(){
       localStorage.removeItem("keyArr");
       $("#historyTop").empty();
   })
   
   //删除单个的历史记录
   //你要知道用户点击的是哪一条历史纪录  做自定义属性 data-key
   //要去拿到自定义属性的值 判断 如果跟我这个存储里面的某一项内容匹配上 就可以删除
   //再从新获取删除后的数组 keyArr
   //再重写一遍模板引擎

   $("body").on('tap',".mui-icon-closeempty",function(){
       //把自定义属性传过去
       removeSearchData($(this).parent().attr('data-key'))
   })

})
var removeSearchData = function(key){
    var list = JSON.parse(localStorage.getItem('keyArr'))
    $.each(list,function(i,item){
      if(key == item){
        list.splice(i,1)
      }
    })
    localStorage.setItem('keyArr',JSON.stringify(list))
    var keyArr = JSON.parse(localStorage.getItem('keyArr'))
    var html=template("historyTpl",{result:keyArr})
    $("#historyTop").html(html)
}