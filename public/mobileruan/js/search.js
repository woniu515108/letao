$(function () {
  //存储历史关键字
  $("#search-btn").on("tap", function () {
    //获取用户输入的内容 存进localStorage里
    var keyword = $(this).siblings("input").val();
    //判断用户是否输入了内容
    if (keyword) {
      //当用户输入完毕按下按钮，将用户输入的关键字追加到数组里
      keyArr.push(keyword);
      //将数组存到localStorage中
      localStorage.setItem("keyArr", JSON.stringify(keyArr))
      // location.reload();
      /* 
        实现用户点击搜索按钮跳转到搜索结果页面
        1.给搜索按钮添加点击事件
        2.获取到用户输入的搜索关键字
        3.判断用户是否输入了搜索关键字
        4.如果没有输入，阻止跳转，并给出提示
        5.如果用户输入了，跳转到搜索结果页面，并且携带这个关键字到这个页面中
      */
      location.href = "search-result.html?keyword=" + keyword;
      $("#search-in").val("");
    } else {
      mui.toast("请输入商品名称");
    }
  });
  /*
    点击搜索历史的某一条，提交到输入框
  */
  $("body").on("tap","#historyTop li",function(){
    $("#search-in").val($.trim($(this).text()))
  });


  /*
    实现历史关键字的存储  以及展示到页面  一存一拿
    1.创建好一个存储关键字的数组
    2.当用户输入完毕按下按钮，将用户输入的关键字追加到数组里
    3.将数组存到localStorage中
    4.在页面一上来的时候，判断一下本低本地存储中是否已经存储有历史关键字，有的话就展示出来
    5.利用模板引擎将数据和html拼接，将收索历史的关键字展示在上面
  */
  var keyArr = [];
  if (localStorage.getItem("keyArr")) {
    //把这个存储里面的字符串的数据转化成数组，给模板引擎去迭代和渲染画面
    keyArr = Array.from(new Set(JSON.parse(localStorage.getItem("keyArr"))));
    console.log(keyArr);
    var html = template("historyTpl", {
      result: keyArr
    });
    $("#historyTop").html(html);

  }

  //删除单个的历史记录
  //你要知道用户点击的是哪一条历史记录  做自定义属性 data-key
  //要去拿到自定义属性的值  判断 如果跟/*  */我这个储存里面的某一项内容匹配上  就可以删除
  //在重新获取删除后的数组 keyArr
  //再重写一遍模板引擎
  $("body").on("tap", ".mui-icon-closeempty", function () {
    // console.log($(this).parent().attr("data-key"));
    removeSearchData($(this).parent().attr("data-key"));
  })

  /*=清空搜索历史= */
  $("#clear").on("tap", function () {
    localStorage.removeItem("keyArr");
    $("#historyTop").empty();
    location.reload();
  })
})

//单个删除搜索记录的方法
var removeSearchData = function (key) {
  var list = JSON.parse(localStorage.getItem("keyArr"));
  //判断 如果自定义的属性值和local里的value相等 我们就删掉
  $.each(list, function (i, item) {
    if (key == item) {
      list.splice(i, 1);
    }
  })
  localStorage.setItem("keyArr", JSON.stringify(list));
  var keyArr = JSON.parse(localStorage.getItem("keyArr"));
  var html = template("historyTpl", {
    result: keyArr
  });
  $("#historyTop").html(html);
}