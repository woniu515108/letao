//ajax封装
var ajaxload =function(url,type,data,beforefn,successfn,errorfn){
    $.ajax({
        url:url,
        type:type,
        data:data,
        beforeSend:function(){
            beforefn;
        },
        success:function(data){
            successfn(data);
        },
        fail:function(error){
            errorfn(error);
        }
    })
}