
	/*开启这个进度条.*/
	NProgress.configure({ showSpinner: false });
	NProgress.start();

	window.onload = function(){
		NProgress.done();
	}

	//这个是给所有的 折叠的a 标签添加点击事件
	// $('.navs ul').prev('a').on('click', function () {
	// 	//点击的时候折叠切换
	// 	$(this).next().slideToggle();
	// });

	/*登出系统.   给用户一个提示  是否要退出系统，点击确认时才退出*/
	$(".logout").on("click", function () {
		//给用户一个提示，您确定要退出系统吗.
		//确认提示框
		var flag = window.confirm("您确定要退出系统吗");
		if (flag) {
			//退出，调用接口，把服务端的session 清除掉.
			$.ajax({
				type: "get",
				url: "/employee/employeeLogout",
				success: function (data) {
					if (data.success) {
						window.location.href = "login.html";
					}
				}
			})
		}
	});


	/* 登录拦截   检测用户是否登录*/
	$.ajax({
		url:'/employee/checkRootLogin',
		type:'get',
		dataType:'json',
		success:function(data){
			console.log(data);
			if(data.error == 400){
				// alert("请先登录！");
				window.location.href="login.html";
			}
		}
	})
