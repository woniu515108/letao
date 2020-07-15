$(function(){
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
// 请求一级分类
	$.ajax({
		url:'/category/queryTopCategory',
		type:'get',
		dataType:'json',
		success: function(res) {
			console.log(res)
			// 使用模板引擎
			var html=template('category-first',{result:res.rows});
			$('#links').html(html);
			// 如果一级商品分类有数据
			if(res.rows.length){
				$('#links').find('a').eq(0).addClass('active');
				var id=res.rows[0].id;
				$.ajax({
					url:'/category/querySecondCategory',
					type:'get',
					data:{
						id:id
					},
					dataType:'json',
					success:function(res){
						console.log(res)
						var html=template('category-second',{result:res.rows});
						$('#brand-list').html(html)
					}
				})
			}
		}
	})
})