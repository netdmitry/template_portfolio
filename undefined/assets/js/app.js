(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function($) {
  
    "use strict";
    // var preloader = require("./modules/preloader.js"),
    //     forms = require("./modules/forms.js"),
    //     map = require("./modules/map.js"),
    // //     slider = require("./modules/slider.js"),
    // var  blogNavigation = require("./modules/blogNavigation.js");

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
  }




  
  // ==============================
  // Preloader
  // ==============================

   var imgs =[]; 
    
    $.each($('*'), function () {   
        var 
            $this = $(this), 
            background = $this.css('background-image'),
            img = $this.is('img');
        
        if (background != 'none') {
            var path = background.replace('url("', '').replace ('")', ''); 
            imgs.push(path); 
        }
            
        
        if (img) {
            var path = $this.attr('src'); 
        
            if (path) {
            imgs.push(path); 
            
            }

        }
    });

    var percentsTotal = 1;

    for (var i = 0; i < imgs.length; i++) {  
        var image = $('<img>', {
            attr : {
                src: imgs[i] 
            }
        });

       

        image.on('load', function () {
            setPercents(imgs.length, percentsTotal); 
            percentsTotal++; 

        });
    }


    function setPercents(total, current) {  
        var percent = Math.ceil(current / total * 100); 
        
        if (percent >= 100) {
            $('.preloader'). fadeOut(); 
        }

       
        $('.preloader__percents').text(percent + '%');


    }



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

// if($(".blog-navigation").length){
//     blogNavigation();
//   }
                       

// ==============================
// BLOG  - CLICK > COMMING TO ARTICLE
// ==============================
$('.links-list__link').on('click', function (e) {
  e.preventDefault();
  var targetElem = $($(this).attr('href'));
  if (targetElem.length !== 0) {
    $('html,body').animate({scrollTop: targetElem.offset().top}, 1000);
  }
});


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
     google.maps.event.addDomListener(window, 'load', init);
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




})(jQuery);


(function blogNavigation() {
    //vars
    var windowWidth,
        isOpen = false,
        lastId;

    function init() {
      initEvents();
    }
    function initEvents() {
      //sidebar toggler click
      sidebar.on('click',function(e){
        var $this=$(this);
        e.preventDefault();
        if(!$this.hasClass('fixed')){
          toggleMenu();
        }
      });


      //window size
      $(window).on('resize load', function () {
        windowWidth = $(this).width();
        sidebar.removeClass('active');
        if ($(this).width() <= 783) {
          sidebar.removeClass('fixed');
        }
        isOpen = false;
      });
      //window scroll
      $(window).on('scroll', function () {
        var $this = $(this);
        var scrollTop = $this.scrollTop();
        checkSidebarPosition(scrollTop);
        activateSidebarElems(scrollTop);
        if(windowWidth<=783 && scrollTop>$this.height()){
          sidebar.show();
        }/*else if(windowWidth>783 && scrollTop<$this.height() && !sidebar.hasClass('active')){
          sidebar.hide();
        }*/


      });

    }

    function checkElem(e) {
      var target = e.target;
      if (isOpen && !sidebar[0].contains(target)) {
        toggleMenu();
      }

    }

    function toggleMenu() {
      if (isOpen) {
        sidebar.removeClass('active');
        body.off('click', checkElem);
      } else {
        sidebar.addClass('active');
        body.on('click', checkElem);
      }
      isOpen = !isOpen;
    }

    function checkSidebarPosition(scrollTop) {
      if (sidebar.hasClass('fixed') && scrollTop < sidebarTop) {
       
        sidebar.removeClass('fixed');
      } else if (scrollTop > sidebarTop && windowWidth > 783) {
        sidebar.addClass('fixed');
      }
    }

    function activateSidebarElems(scrollTop) {
      var cur = scrollItems.map(function () {
        if ($(this).offset().top < scrollTop + 100) {
          return this;
        }
      });
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";

      if (lastId !== id) {
        lastId = id;
        sidebarLinks
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
      }
    }

    if (window.location.pathname.indexOf('blog.html') !== -1) {
      var
          body = $('body'),
          sidebar = $('.blog-navigation'),
          sidebarTop = sidebar.offset().top,
          sidebarLinks = sidebar.find('.links-list__link');
      var scrollItems = sidebarLinks.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
          return item;
        }
      });


      init();
    }
  })(jQuery);

                             



                                // Login card flip START
    
     
    $("#flip-card").click(function() {
        $("body").addClass("card_flipped");

        
    });

    $("#unflip-card").click(function(e) {
        e.preventDefault();
        $("body").removeClass("card_flipped");
    });
                                // Login card flip END

                                

                                //  NAV-MENU START
      $('#toggle').click(function() {
      $(this).toggleClass('active');
      $('#overlay').toggleClass('open');
      });
                                //  NAV-MENU END

                             
            
        
function init() {
   
    var mapOptions = {
        
        zoom: 13,
        scrollwheel:false,

        center: new google.maps.LatLng(47.24920304, 39.72237825), 

        styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#E7A731"}]}]
    };

   
    var mapElement = document.getElementById('map');


    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(47.2357137, 39.701505),
        map: map,
        title: 'Snazzy!'
    });
}










},{}]},{},[1]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uKCQpIHtcclxuICBcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgLy8gdmFyIHByZWxvYWRlciA9IHJlcXVpcmUoXCIuL21vZHVsZXMvcHJlbG9hZGVyLmpzXCIpLFxyXG4gICAgLy8gICAgIGZvcm1zID0gcmVxdWlyZShcIi4vbW9kdWxlcy9mb3Jtcy5qc1wiKSxcclxuICAgIC8vICAgICBtYXAgPSByZXF1aXJlKFwiLi9tb2R1bGVzL21hcC5qc1wiKSxcclxuICAgIC8vIC8vICAgICBzbGlkZXIgPSByZXF1aXJlKFwiLi9tb2R1bGVzL3NsaWRlci5qc1wiKSxcclxuICAgIC8vIHZhciAgYmxvZ05hdmlnYXRpb24gPSByZXF1aXJlKFwiLi9tb2R1bGVzL2Jsb2dOYXZpZ2F0aW9uLmpzXCIpO1xyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBDb250YWN0IGZvcm0gYmx1ciBiYXNlZCBvbiBqc1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICBmdW5jdGlvbiBzZXRfYmcoKXtcclxuICAgIHZhciBzZWN0aW9uID0gJChcIi5yZXZpZXdzXCIpLFxyXG4gICAgICBmb3JtID0gc2VjdGlvbi5maW5kKFwiLmNvbnRhY3QtZm9ybVwiKSxcclxuICAgICAgZm9ybV9iZyA9IGZvcm0uZmluZChcIi5jb250YWN0LWZvcm1fX2JnXCIpLFxyXG4gICAgICBiZ19vZmZzZXQgPSBzZWN0aW9uLm9mZnNldCgpLnRvcCAtIGZvcm1fYmcub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgIGZvcm1fYmcuY3NzKHtcclxuICAgICAgXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIgOiBcImNlbnRlciBcIiArIGJnX29mZnNldCArIFwicHhcIlxyXG4gICAgfSk7XHJcbiAgIFxyXG4gICAgaWYoICQod2luZG93KS53aWR0aCgpID4gd2luZG93LnNpemVMaW1pdCl7XHJcbiAgICAgICQoXCIucmV2aWV3cywgLmNvbnRhY3QtZm9ybV9fYmdcIikuY3NzKFwiYmFja2dyb3VuZC1zaXplXCIsICQod2luZG93KS53aWR0aCgpICsgXCJweFwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmKCQoXCIucmV2aWV3c1wiKS5sZW5ndGgpe1xyXG4gICAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgc2V0X2JnKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICBzZXRfYmcoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbiAgXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gUHJlbG9hZGVyXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICB2YXIgaW1ncyA9W107IFxyXG4gICAgXHJcbiAgICAkLmVhY2goJCgnKicpLCBmdW5jdGlvbiAoKSB7ICAgXHJcbiAgICAgICAgdmFyIFxyXG4gICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksIFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXHJcbiAgICAgICAgICAgIGltZyA9ICR0aGlzLmlzKCdpbWcnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlICgnXCIpJywgJycpOyBcclxuICAgICAgICAgICAgaW1ncy5wdXNoKHBhdGgpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpbWcpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHsgIFxyXG4gICAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICBhdHRyIDoge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBpbWdzW2ldIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGltYWdlLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7IFxyXG4gICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7IFxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWwsIGN1cnJlbnQpIHsgIFxyXG4gICAgICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuIGZhZGVPdXQoKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIFxyXG4gICAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnRzJykudGV4dChwZXJjZW50ICsgJyUnKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIEJ1dHRvbnMgc2Nyb2xsXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgXHJcbiAgdmFyIENsaWNrVG9wQm90dG9tID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBCb3R0b21zdmcgPSAkKFwiLkJvdHRvbXN2Z1wiKTtcclxuICAgIEJvdHRvbXN2Zy5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAkKHdpbmRvdykuaGVpZ2h0KCl9LCA1MDApO1xyXG4gIH0pO1xyXG59KSgpO1xyXG4gICAgICAgICAgICBcclxuICB2YXIgQ2xpY2tUb3BCb3R0b20gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIFRvcHN2ZyA9ICQoXCIuVG9wU3ZnXCIpO1xyXG4gICAgVG9wc3ZnLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCA1MDAsIFwic3dpbmdcIik7XHJcbiAgfSk7XHJcbn0pKCk7XHJcblxyXG4vLyBpZigkKFwiLmJsb2ctbmF2aWdhdGlvblwiKS5sZW5ndGgpe1xyXG4vLyAgICAgYmxvZ05hdmlnYXRpb24oKTtcclxuLy8gICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQkxPRyAgLSBDTElDSyA+IENPTU1JTkcgVE8gQVJUSUNMRVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuJCgnLmxpbmtzLWxpc3RfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICB2YXIgdGFyZ2V0RWxlbSA9ICQoJCh0aGlzKS5hdHRyKCdocmVmJykpO1xyXG4gIGlmICh0YXJnZXRFbGVtLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0YXJnZXRFbGVtLm9mZnNldCgpLnRvcH0sIDEwMDApO1xyXG4gIH1cclxufSk7XHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFBpZWNoYXJ0IEZJTExcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmlmKCQoXCIucGllY2hhcnRcIikpe1xyXG4gICAkLmVhY2goJChcIi5waWVjaGFydFwiKSwgZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XHJcbiAgICAgICB2YXIgdGhpc1BlcmNlbnQgPSAkKHRoaXMpLmRhdGEoXCJwZXJjZW50XCIpLFxyXG4gICAgICAgICAgIHBlcmNlbnRUb0Rhc2ggPSAzMTQtKDMxNCp0aGlzUGVyY2VudCkvMTAwO1xyXG4gICAgICAgJCh0aGlzKS5jaGlsZHJlbihcIi5waWVjaGFydF9fZmlsbFwiKS5jc3Moe1xyXG4gICAgICAgICAgIFwic3Ryb2tlLWRhc2hvZmZzZXRcIjpwZXJjZW50VG9EYXNoK1wicHhcIlxyXG4gICAgICAgfSk7XHJcbiAgIH0pO1xyXG59XHJcbiBcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBMb2FkIG1hcFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaWYoJChcIiNtYXBcIikubGVuZ3RoKXtcclxuICAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgaW5pdCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFJBRElPIEJVVFRPTlxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuJCgnaW5wdXRbbmFtZT1cInJhZGlvLWJ0blwiXScpLndyYXAoJzxkaXYgY2xhc3M9XCJyYWRpby1idG5cIj48aT48L2k+PC9kaXY+Jyk7XHJcbiQoXCIucmFkaW8tYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgYmxvY2sgPSBfdGhpcy5wYXJlbnQoKS5wYXJlbnQoKTtcclxuICAgIGJsb2NrLmZpbmQoJ2lucHV0OnJhZGlvJykuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgIGJsb2NrLmZpbmQoXCIucmFkaW8tYnRuXCIpLnJlbW92ZUNsYXNzKCdjaGVja2VkUmFkaW8nKTtcclxuICAgIF90aGlzLmFkZENsYXNzKCdjaGVja2VkUmFkaW8nKTtcclxuICAgIFxyXG59KTtcclxuXHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFOSU1BVElPTlxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuJChcIi5za2lsbHMtZGVzY3IsIC5ncm91cF9faXRlbSwgLmdyb3VwX190aXRsZVwiKS5hbmltYXRlZChcImZhZGVJblVwXCIpO1xyXG4kKFwiLmJpby10ZXh0XCIpLmFuaW1hdGVkKFwiZmFkZUluXCIpO1xyXG5cclxuJChcIi5zdmctaGVhZGluZywgLnJldmlld3NfX2xpc3QsIC5jb250YWN0LWZvcm1cIikuYW5pbWF0ZWQoXCJmYWRlSW5VcFwiKTtcclxuJChcIi5wb3J0Zm9saW8tc2xpZGVyX19wcm9qZWN0cy1jb250YWluZXJcIikuYW5pbWF0ZWQoXCJmYWRlSW5cIik7XHJcblxyXG5cclxuXHJcblxyXG59KShqUXVlcnkpO1xyXG5cclxuXHJcbihmdW5jdGlvbiBibG9nTmF2aWdhdGlvbigpIHtcclxuICAgIC8vdmFyc1xyXG4gICAgdmFyIHdpbmRvd1dpZHRoLFxyXG4gICAgICAgIGlzT3BlbiA9IGZhbHNlLFxyXG4gICAgICAgIGxhc3RJZDtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICBpbml0RXZlbnRzKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpbml0RXZlbnRzKCkge1xyXG4gICAgICAvL3NpZGViYXIgdG9nZ2xlciBjbGlja1xyXG4gICAgICBzaWRlYmFyLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgdmFyICR0aGlzPSQodGhpcyk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmKCEkdGhpcy5oYXNDbGFzcygnZml4ZWQnKSl7XHJcbiAgICAgICAgICB0b2dnbGVNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcblxyXG4gICAgICAvL3dpbmRvdyBzaXplXHJcbiAgICAgICQod2luZG93KS5vbigncmVzaXplIGxvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93V2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XHJcbiAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKCQodGhpcykud2lkdGgoKSA8PSA3ODMpIHtcclxuICAgICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgICAgLy93aW5kb3cgc2Nyb2xsXHJcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9ICR0aGlzLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGNoZWNrU2lkZWJhclBvc2l0aW9uKHNjcm9sbFRvcCk7XHJcbiAgICAgICAgYWN0aXZhdGVTaWRlYmFyRWxlbXMoc2Nyb2xsVG9wKTtcclxuICAgICAgICBpZih3aW5kb3dXaWR0aDw9NzgzICYmIHNjcm9sbFRvcD4kdGhpcy5oZWlnaHQoKSl7XHJcbiAgICAgICAgICBzaWRlYmFyLnNob3coKTtcclxuICAgICAgICB9LyplbHNlIGlmKHdpbmRvd1dpZHRoPjc4MyAmJiBzY3JvbGxUb3A8JHRoaXMuaGVpZ2h0KCkgJiYgIXNpZGViYXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuICAgICAgICAgIHNpZGViYXIuaGlkZSgpO1xyXG4gICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0VsZW0oZSkge1xyXG4gICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgIGlmIChpc09wZW4gJiYgIXNpZGViYXJbMF0uY29udGFpbnModGFyZ2V0KSkge1xyXG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xyXG4gICAgICBpZiAoaXNPcGVuKSB7XHJcbiAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgYm9keS5vZmYoJ2NsaWNrJywgY2hlY2tFbGVtKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaWRlYmFyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBib2R5Lm9uKCdjbGljaycsIGNoZWNrRWxlbSk7XHJcbiAgICAgIH1cclxuICAgICAgaXNPcGVuID0gIWlzT3BlbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1NpZGViYXJQb3NpdGlvbihzY3JvbGxUb3ApIHtcclxuICAgICAgaWYgKHNpZGViYXIuaGFzQ2xhc3MoJ2ZpeGVkJykgJiYgc2Nyb2xsVG9wIDwgc2lkZWJhclRvcCkge1xyXG4gICAgICAgXHJcbiAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuICAgICAgfSBlbHNlIGlmIChzY3JvbGxUb3AgPiBzaWRlYmFyVG9wICYmIHdpbmRvd1dpZHRoID4gNzgzKSB7XHJcbiAgICAgICAgc2lkZWJhci5hZGRDbGFzcygnZml4ZWQnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlU2lkZWJhckVsZW1zKHNjcm9sbFRvcCkge1xyXG4gICAgICB2YXIgY3VyID0gc2Nyb2xsSXRlbXMubWFwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5vZmZzZXQoKS50b3AgPCBzY3JvbGxUb3AgKyAxMDApIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGN1ciA9IGN1cltjdXIubGVuZ3RoIC0gMV07XHJcbiAgICAgIHZhciBpZCA9IGN1ciAmJiBjdXIubGVuZ3RoID8gY3VyWzBdLmlkIDogXCJcIjtcclxuXHJcbiAgICAgIGlmIChsYXN0SWQgIT09IGlkKSB7XHJcbiAgICAgICAgbGFzdElkID0gaWQ7XHJcbiAgICAgICAgc2lkZWJhckxpbmtzXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKVxyXG4gICAgICAgICAgICAuZW5kKCkuZmlsdGVyKFwiW2hyZWY9JyNcIiArIGlkICsgXCInXVwiKS5wYXJlbnQoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignYmxvZy5odG1sJykgIT09IC0xKSB7XHJcbiAgICAgIHZhclxyXG4gICAgICAgICAgYm9keSA9ICQoJ2JvZHknKSxcclxuICAgICAgICAgIHNpZGViYXIgPSAkKCcuYmxvZy1uYXZpZ2F0aW9uJyksXHJcbiAgICAgICAgICBzaWRlYmFyVG9wID0gc2lkZWJhci5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgICBzaWRlYmFyTGlua3MgPSBzaWRlYmFyLmZpbmQoJy5saW5rcy1saXN0X19saW5rJyk7XHJcbiAgICAgIHZhciBzY3JvbGxJdGVtcyA9IHNpZGViYXJMaW5rcy5tYXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpdGVtID0gJCgkKHRoaXMpLmF0dHIoXCJocmVmXCIpKTtcclxuICAgICAgICBpZiAoaXRlbS5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG4gIH0pKGpRdWVyeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvZ2luIGNhcmQgZmxpcCBTVEFSVFxyXG4gICAgXHJcbiAgICAgXHJcbiAgICAkKFwiI2ZsaXAtY2FyZFwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImNhcmRfZmxpcHBlZFwiKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3VuZmxpcC1jYXJkXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJjYXJkX2ZsaXBwZWRcIik7XHJcbiAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMb2dpbiBjYXJkIGZsaXAgRU5EXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgTkFWLU1FTlUgU1RBUlRcclxuICAgICAgJCgnI3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgJCgnI292ZXJsYXknKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgTkFWLU1FTlUgRU5EXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICBcclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgXHJcbiAgICB2YXIgbWFwT3B0aW9ucyA9IHtcclxuICAgICAgICBcclxuICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICBzY3JvbGx3aGVlbDpmYWxzZSxcclxuXHJcbiAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ3LjI0OTIwMzA0LCAzOS43MjIzNzgyNSksIFxyXG5cclxuICAgICAgICBzdHlsZXM6IFt7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlLm5hdHVyYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImNvbG9yXCI6XCIjZTBlZmVmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn0se1wiaHVlXCI6XCIjMTkwMGZmXCJ9LHtcImNvbG9yXCI6XCIjYzBlOGU4XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoxMDB9LHtcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVsc1wiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdC5saW5lXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn0se1wibGlnaHRuZXNzXCI6NzAwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI0U3QTczMVwifV19XVxyXG4gICAgfTtcclxuXHJcbiAgIFxyXG4gICAgdmFyIG1hcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XHJcblxyXG5cclxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEVsZW1lbnQsIG1hcE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIExldCdzIGFsc28gYWRkIGEgbWFya2VyIHdoaWxlIHdlJ3JlIGF0IGl0XHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDcuMjM1NzEzNywgMzkuNzAxNTA1KSxcclxuICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICB0aXRsZTogJ1NuYXp6eSEnXHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cbn0se31dfSx7fSxbMV0pO1xuIl0sImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
