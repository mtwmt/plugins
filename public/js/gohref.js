'use strict';

(function ($) {
  $.fn.gohref = function (options) {

    options = $.extend({
      top: 0,
      speed: 400,
      now: false
    }, options);

    this.on('click', 'a', function () {
      var $self = $(this),
          $win = $(window),
          href = $self.attr('href'),
          hashoffset = $(href).offset().top,
          getOffset = hashoffset - options.top;

      if (options.now) {
        $self.parent().addClass('active').siblings().removeClass('active');
        $(href).addClass('active').siblings().removeClass('active');
      }

      $('html,body').stop().animate({
        scrollTop: getOffset
      }, options.speed);
      return false;
    });
  };
})(jQuery);