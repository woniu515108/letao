
$(function(){
    $.ajax({
        url:'/cart/queryCart',
        type:'get',
        success:function(res){
            var html=template("cartTpl",{result:res})
            $("#cart_box").html(html)
            // setAmount(res)
        }
    })
    // $("body").on('change','input[type="checkbox"]',function(){
    //     setAmount();
    // });
})
// var setAmount = function(res){
//     console.log(res)
//     var amount = 0;
//     var checkPro = $('input:checked');
//     for(var i = 0 ; i < checkPro.length ; i ++){
//         var id = checkPro.attr('data-id')
//        if(id = res.id)
//     }
//     $('#cartAmount').html(Math.ceil(amount*100)/100);
// };