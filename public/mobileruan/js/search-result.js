var allGoods = "";
var page = 1;
var pageSize = 3;
var priceSort = 1;
var Url = JSON.stringify(location.href);
var index = Url.indexOf("=") ; //传的值
var html = "";


var keyword = decodeURI(getParamsByUrl(location.href, "keyword"));  //传的参数名

//获取关键字
function getParamsByUrl(url, name) {
  var params = url.substr(index);
  return params;
}

$(function () {
  /*
    价格排序逻辑：
    1.获取价格按钮，添加点击事件
    2.用三元运算符，动态地控制升序和降序的切换
    3.调用商品的接口，带上排序规则的参数，price
    4.排序完成后，重新刷新页面，getData();
  */
  $("#priceSort").on("tap", function () {
    //三元运算符，动态切换升降序
    priceSort = priceSort === 1 ? 2 : 1;
    allGoods = "";
    page = 1;
    mui("#refreshContainer").pullRefresh().refresh(true);
    getData(); //重新启用上拉加载更多  模板引擎也做了
  })



  mui.init({
    pullRefresh: {
      container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        height: 50, //可选,默认50.触发下拉刷新拖动距离,
        auto: false, //可选,默认false.首次加载自动下拉刷新一次
        contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        contentnomore: "没有更多数据了 T T",
        callback: refreshData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up: {
        height: 50, //可选,默认50.触发下拉刷新拖动距离,
        auto: true, //可选,默认false.首次加载自动下拉刷新一次
        contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        contentnomore: "没有更多数据了 T T",
        callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  /*
    根据用户输入的关键字来发请求获取搜索结果
    1.获取到地址栏里面传过来的关键字
    2.用关键字调取接口的数据
    3.将搜索结果的数据通过模板引擎渲染到页面
  */

  // //下拉刷新
  function refreshData() {
    var that = this;
    setTimeout(function () { //2秒后执行函数
      var that = this;
      window.location.reload(); //刷新
      that.pullRefresh().endPulldownToRefresh(true); //用来停止刷新
    }, 1500);
  }

  //上拉加载
  function getData() {
    var that = this; //插件要求
    $.ajax({
      url: '/product/queryProduct',
      type: 'get',
      data: {
        proName: keyword,
        page: page++,
        pageSize: pageSize,
        price: priceSort
      },
      success: (res) => {
        // console.log(res)
        if (res.data.length > 0) {
          //模板引擎需要叠加，触底一次，叠加一下数据
          console.log(res.data);
          allGoods += template("search-list", res);
          $("#search-box").html(allGoods);
          //告诉上拉加载组件当前数据已经加载完毕
          that.endPullupToRefresh(false);
          // that.pullRefresh().endPulldownToRefresh(true); //用来停止刷新
        } else { //上拉的提示关闭
          that.endPullupToRefresh(true);
        };
      }
    })
  }

})

