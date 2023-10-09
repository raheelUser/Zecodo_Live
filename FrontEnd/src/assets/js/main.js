import $ from 'jquery';


// UPLOAD FEATURE JS START
$(document).ready(function() {

    
var readURL = function(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.profile-pic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}


$(".file-upload").on('change', function(){
    readURL(this);
});

$(".upload-button").on('click', function() {
    $(".file-upload").click();
});
});


// Upload Feature JS END 


// Multiphoto upload in Reviews
$(document).ready(function () {
    ImgUpload();
  });
  
  function ImgUpload() {
    var imgWrap = "";
    var imgArray = [];
  
    $('.upload__inputfile').each(function () {
      $(this).on('change', function (e) {
        imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
        var maxLength = $(this).attr('data-max_length');
  
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        var iterator = 0;
        filesArr.forEach(function (f, index) {
  
          if (!f.type.match('image.*')) {
            return;
          }
  
          if (imgArray.length > maxLength) {
            return false
          } else {
            var len = 0;
            for (var i = 0; i < imgArray.length; i++) {
              if (imgArray[i] !== undefined) {
                len++;
              }
            }
            if (len > maxLength) {
              return false;
            } else {
              imgArray.push(f);
  
              var reader = new FileReader();
              reader.onload = function (e) {
                var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                imgWrap.append(html);
                iterator++;
              }
              reader.readAsDataURL(f);
            }
          }
        });
      });
    });
  
    $('body').on('click', ".upload__img-close", function (e) {
      var file = $(this).parent().data("file");
      for (var i = 0; i < imgArray.length; i++) {
        if (imgArray[i].name === file) {
          imgArray.splice(i, 1);
          break;
        }
      }
      $(this).parent().parent().remove();
    });
  }

//  modal
(function($) {
  "use strict";
      $(document).ready(function() {
              $('.modal-link').on('click', function() {
              $('body').addClass("modal-open");
          });
          $('.close-modal').on('click', function() {
              $('body').removeClass("modal-open");
          });
      });
}($));

// Backpayment modal
(function($) {
  "use strict";
      $(document).ready(function() {
              $('.modal-links').on('click', function() {
              $('body').addClass("modal-open");
          });
          $('.close-modal').on('click', function() {
              $('body').removeClass("modal-open");
          });
      });
}($));

// Confirmpayment modal
(function($) {
  "use strict";
      $(document).ready(function() {
              $('.modal-linkss').on('click', function() {
              $('body').addClass("modal-open");
          });
          $('.close-modal').on('click', function() {
              $('body').removeClass("modal-open");
          });
      });
}($));

// Refund modal
(function($) {
  "use strict";
      $(document).ready(function() {
              $('.modal-linksss').on('click', function() {
              $('body').addClass("modal-open");
          });
          $('.close-modal').on('click', function() {
              $('body').removeClass("modal-open");
          });
      });
}($));

// REVIEW modal
(function($) {
  "use strict";
      $(document).ready(function() {
              $('.modal-linkssss').on('click', function() {
              $('body').addClass("modal-open");
          });
          $('.close-modal').on('click', function() {
              $('body').removeClass("modal-open");
          });
      });
}($));

// REVIEW modal thankyou
// TOGGLE

$(document).ready(function() {
  $("button.navbar-toggler").click(function() {
    $("#navbarNav").toggle();
  });
});

// Product gallery with thumbnail
$(document).ready(function(){
  $(".thumbnaill img").click(function(){
    var plaatje = $(this).attr("src");
    $("#grote_image").attr("src",plaatje);
    
  });
});

// Range Slider
