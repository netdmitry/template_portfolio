(function($) {
  
    "use strict";
    var map = require("./modules/map.js");
    var preloader = require("./modules/preloader.js");
    var blogNavigation = require("./modules/blogNavigation.js");
    var script = require('./modules/script')();
    var slider = require('./modules/slider.js');
  

// ==============================
// SLIDER
// ==============================
if($(".portfolio-slider").length){
    $(".portfolio-projects .project__title, .portfolio-projects .project__tech")
    slider.createSlider(".portfolio-slider", 700);
}

// ==============================
// Contact form blur based on js
// ==============================
function set_bg(){
  var section = $(".reviews"),
    form = section.find(".contact-form"),
    form_bg = form.find(".contact-form__bg"),
    bg_offset = section.offset().top - form_bg.offset().top;

  form_bg.css({
    "background-position" : "center " + bg_offset + "px"
  });
 
  if( $(window).width() > window.sizeLimit){
    $(".reviews, .contact-form__bg").css("background-size", $(window).width() + "px");
  }
}

if($(".reviews").length){
  $(window).on("load", function() {
    set_bg();
  });

  $(window).resize(function() {
    set_bg();
  });
};

// ==============================
// Buttons scroll
// ==============================
var ClickTopBottom = (function () {
  var Bottomsvg = $(".Bottomsvg");
  Bottomsvg.on("click", function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: $(window).height()}, 500);
});
})();
          
var ClickTopBottom = (function () {
  var Topsvg = $(".TopSvg");
  Topsvg.on("click", function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 500, "swing");
});
})();

// ==============================
// Piechart FILL
// ==============================
if($(".piechart")){
   $.each($(".piechart"), function( key, value ) {
       var thisPercent = $(this).data("percent"),
           percentToDash = 314-(314*thisPercent)/100;
       $(this).children(".piechart__fill").css({
           "stroke-dashoffset":percentToDash+"px"
       });
   });
}

// ==============================
// Load map
// ==============================
if($("#map").length){
     google.maps.event.addDomListener(window, 'load', map.init("map"));
  }

// ==============================
// RADIO BUTTON
// ==============================
$('input[name="radio-btn"]').wrap('<div class="radio-btn"><i></i></div>');
$(".radio-btn").on('click', function () {
    var _this = $(this),
        block = _this.parent().parent();
    block.find('input:radio').attr('checked', false);
    block.find(".radio-btn").removeClass('checkedRadio');
    _this.addClass('checkedRadio');
});

// ==============================
// ANIMATION
// ==============================
$(".skills-descr, .group__item, .group__title").animated("fadeInUp");
$(".bio-text").animated("fadeIn");

$(".svg-heading, .reviews__list, .contact-form").animated("fadeInUp");
$(".portfolio-slider__projects-container").animated("fadeIn");

// ==============================
// WELCOME FLIP CARD
// ==============================
$("#flip-card").click(function() {
    $(".flip-container").removeClass("focus");
    $("#flip-card").addClass("hidden");
});

$("#unflip-card").click(function(e) {
    e.preventDefault();
    $(".flip-container").addClass("focus");
    $("#flip-card").removeClass("hidden");
});

// ==============================
// NAV MENU 
// ==============================
$('#toggle').click(function() {
  $(this).toggleClass('active');
$('#overlay').toggleClass('open');
});

})(jQuery);