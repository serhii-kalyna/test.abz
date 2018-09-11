$(document).ready(function(){

	$.ajax({
		url  :'http://504080.com/api/v1/services/categories',
		type :'GET',
		dataType: "json",
		async:false,
		contentType: "application/json; charset=utf-8",
		beforeSend: function(xhr) {
                 xhr.setRequestHeader("Authorization", "3ea508f4081d4163333d094bcd8eca97065d6620");
             },
             success: function(data){
             	$('.no-results').hide();
             	for(var i=0;i<data["data"].length;i++){
             		$('#category').append('<div class="box"><div class="block-img"><img src="'+data["data"][i].icon+'" alt=""></div><h4>'+data["data"][i].title+'</h4></div>');
             	}
             },
             error: function(xhr, ajaxOptions, thrownError) {
             	$('.no-results').show();
             	// alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
             	var array = JSON.parse(xhr.responseText);
             	// alert(array.error.message);
             	// alert(array.error.code);
             	// alert(array.error.description);
             	$('#block-modal').show();
             	$('#error-modal').append('<h2 class="error-msg">'+array.error.description+'</h2>');
             	$('#close-modal').click(function(){
             		$('#block-modal').fadeOut(1000);
             	})
             }
         });

})