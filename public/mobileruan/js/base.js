//因为mui组件他是默认禁止a的href属性  无法跳转页面  所以我们要激活a标签
$(function () {
    mui('body').on('tap', 'a', function () {
        window.top.location.href = this.href;
    });
})