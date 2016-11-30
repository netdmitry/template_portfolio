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
        console.log('fixed');
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
  })();

