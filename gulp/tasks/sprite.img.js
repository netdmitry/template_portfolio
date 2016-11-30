'use strict';

module.exports = function() {
  $.gulp.task('sprite:img', function() {
    var spriteData = $.gulp.src('./source/sprite/*.png').pipe($.gp.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        imgPath: '../img/sprite.png'
      }));

    var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
      .pipe($.gp.buffer())
      .pipe($.gulp.dest('./source/sprite/img'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
      
      .pipe($.gulp.dest('./source/sprite/css'));


    // Return a merged stream to handle both `end` events
      return $.merge(imgStream, cssStream);
  })
};