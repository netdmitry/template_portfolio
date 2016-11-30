// preloader
;(function($) {
  var config,
   preloader_pl,
    timer,
    draw_i=0,
   defaults = {
    preloader_class: 'preloader',
    preloader_percent_class: 'preloader__counter',
    preloader_svg_class:'preloader__svg',
    circle_radius:100,
     circle_width:15
  };
  function preloader(element,options){
    this.root=$(element);
    this.config=$.extend({},defaults,options);
    this.init();
  }
  preloader.prototype.re_draw=function() {
    percent=preloader_pl.counter+1;
    if(parseInt(preloader_pl.counter)>parseInt(preloader_pl.percent)) return;
    preloader_pl.counter=percent;

    if(percent>=100){
      preloader_pl.preloader.fadeOut(1000,function(){
        preloader_pl.root.css('overflow','');
        $(this).remove();
       });
      percent=100;
      clearInterval(timer);
    }
    preloader_pl.preloader_counter.text(percent);

    var angle =3.6*percent-90;
    angle %= 360;
    var radians= (angle/180) * Math.PI;
    var width=preloader_pl.config.circle_width;
    var radius=preloader_pl.config.circle_radius-width;
    var x = radius+width + Math.cos(radians) * radius;
    var y = radius+width + Math.sin(radians) * radius;
    var str = preloader_pl.arc.getAttribute("d");
    if(draw_i==0) {
      var str = str+ " M "+x + " " + y;
    }
    else {
      var str = str+ " L "+x + " " + y;
    }
    preloader_pl.arc.setAttribute("d", str);
    draw_i++;
  };
  preloader.prototype.re_calc=function(){
    var percent=Math.ceil(100*preloader_pl.img_load/preloader_pl.img_total);
    if(parseInt(preloader_pl.img_load)==parseInt(preloader_pl.img_total)) {
      percent = 100;
    };
    preloader_pl.percent=percent;
  };

  preloader.prototype.load_img_normal=function(){
    preloader_pl.img_load++;
    preloader_pl.re_calc();
  };
  preloader.prototype.load_img_error=function(){
    preloader_pl.img_load++;
    preloader_pl.re_calc();
  };
  preloader.prototype.init=function(){
    this.root.css('overflow','hidden');
    this.preloader=$('.'+this.config.preloader_class);
    this.preloader_counter=$('.'+this.config.preloader_percent_class);
    this.preloader_svg=$('.'+this.config.preloader_svg_class);
    this.arc=this.preloader_svg.find('.arc')[0];

    var img_list=[];

    $('*').each(function(){
      var
        $this=$(this),
        background=$this.css('background-image'),
        img=$this.is('img');
      if(background != 'none') {
        background = background.split(",");
        for (i = 0; i < background.length; i++) {
          var path = background[i].replace('url("', '').replace('")', '').replace(' ', '');
          img_list.push(path);
        }
      }
      if(img){
        var path = $this.attr('src');
        if(path){
          img_list.push(path);
        }
      }
    });
    this.img_total=img_list.length;
    this.img_load=0;
    this.counter=0;
    preloader_pl=this;
    for(i=0;i<img_list.length;i++){
      var image= new Image();
      image.onload=this.load_img_normal;
      image.onerror=this.load_img_normal;
      image.src=img_list[i];
    }
    this.preloader_counter.text(0);
    this.re_calc();
    timer=setInterval(this.re_draw,5);
  };
  $.fn.preloader=function(options){
    new preloader(this,options);
    return this;
  }
})(jQuery);

$('body').preloader();
//end preloader