'use strict';

(function ($) {
  $.fn.gohref = function (options) {

    options = $.extend({
      top: 0,
      speed: 400
    }, options);

    this.on('click', 'a', function () {
      var $self = $(this),
          href = $self.attr('href'),
          hashoffset = $(href).offset().top;

      $self.parent('li').addClass('active').siblings().removeClass('active');
      $('html,body').stop().animate({
        scrollTop: hashoffset - options.top
      }, options.speed);
      return false;
    });
  };
})(jQuery);