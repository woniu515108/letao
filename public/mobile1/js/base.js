// 因为mui组件库他是默认禁止a的href属性 无法跳转 我们要激活才能使用
$(function(){
    mui('body').on('tap','a',function(){
        window.top.location.href=this.href;
    });
    // 1、返回失效 重写mui.back()方法
    mui.back=function(){
        // plus.webview.currentWebview().parent().evalJs('mui.back()');
         plus.webview.currentWebview().close();
    }

})