$(document).ready(function(){

  $(function(){
    $.getJSON('http://504080.com/api/v1/directories/enquiry-types', function(data) {
      for(var i=0;i<data["data"].length;i++){
        $("#enquiry").append(new Option(data["data"][i].name, i+1));
      }
    });
  });

  $('#enquiry').change(function(event) {
    if ($('#enquiry option:selected').text() == "Other"){
      $('input#other-type').slideDown();
    }else{
      $('input#other-type').slideUp();
    }
  });

  $(".box2").ellipsis();
  $(".title").ellipsis();

  // (function($) {
  //   $(function() {
  //    $('select').styler({
  //     selectSearch: true,
  //   });
  //  });
  // })(jQuery);

  $("#description").keyup(function(){
    var box=$(this).val();
    var charsMax = 1000;
    var count = box.length;

    if(box.length <= charsMax){
     $('h4.count').html('('+count+'/'+charsMax+')');
   }
   return false;
 });

  $("#submit").click(function(){
    var name = $("#name").val();
    var email = $("#email").val();
    if (name == ""){
      $(".name-msg").show();
      $("input#name").css('borderColor','#fb6363');
    }else{
      $(".name-msg").hide();
      $("input#name").css('borderColor','#e0e2e6');
    }
    if (isValidEmailAddress(email) == false){
      $(".email-msg").show();
      $("input#email").css('borderColor','#fb6363');
    }else{
      $(".email-msg").hide();
      $("input#email").css('borderColor','#e0e2e6');
    }
  });

});

(function($) {
  $.fn.ellipsis = function()
  {
    return this.each(function()
    {
      var el = $(this);

      if(el.css("overflow") == "hidden")
      {
        var text = el.html();
        var multiline = el.hasClass('multiline');
        var t = $(this.cloneNode(true))
        .hide()
        .css('position', 'absolute')
        .css('overflow', 'visible')
        .width(multiline ? el.width() : 'auto')
        .height(multiline ? 'auto' : el.height())
        ;

        el.after(t);

        function height() { return t.height() > el.height(); };
        function width() { return t.width() > el.width(); };

        var func = multiline ? height : width;

        while (text.length > 0 && func())
        {
          text = text.substr(0, text.length - 1);
          t.html(text + "...");
        }

        el.html(t.html());
        t.remove();
      }
    });
  };
})(jQuery);

function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
}

function handleFileSelect(evt) {
  var files = evt.target.files;

  for (var i = 0, f; f = files[i]; i++) {
    if (!f.type.match('image.jpeg','image.jpg','image.png') || f.size > 5000000) {
      $('.error-msg').fadeIn(300);
      $('.photo>h4').css('margin-top','5px');
      continue;
    }else{
      $('.error-msg').hide();
      $('.photo>h4').css('margin-top','30px');
    }
    var reader = new FileReader();

    reader.onload = (function(theFile) {
     return function(e) {
      var span = document.createElement('span');
      span.innerHTML = ['<img class="thumb" src="', e.target.result,
      '" title="', theFile.name, '"/>'].join('');
      document.getElementById('list').insertBefore(span, null);
    };
  })(f);

  reader.readAsDataURL(f);
}
}

document.getElementById('add-img').addEventListener('change', handleFileSelect, false);