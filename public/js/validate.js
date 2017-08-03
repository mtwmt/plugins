'use strict';

var validate = validate || {};

validate = function ($) {

  var $form = $('.form'),
      $submit = $('[data-submit]'),
      cls,
      log,
      check = {
    name: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/,
    mail: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    password: /^[a-zA-Z0-9_-]{8,}$/
  },
      chkArr = ['name', 'mail', 'password', 'same'],
      chk = function chk($select, dom) {
    if (dom === 'same') {
      var target = $select.data('same'),
          $target = $('.' + target + '');
      $select.val() != $target.val() ? $select.parent().addClass('error') : '';
    } else if (!check[dom].test($select.val())) {
      $select.parent().addClass('error');
      console.log($select);
    }
  },
      init = function init() {

    $form.find('input').each(function (i, e) {
      var input = this;
      $(this).on('blur', function () {
        $(this).parent().removeClass('error');

        $.each(chkArr, function (idx, el) {
          if (input.hasAttribute('data-' + chkArr[idx])) {
            chk($(input), el);
          }
        });
      });
    });

    $submit.on('click', function () {
      var log = [];
      $form.find('input').each(function (i, e) {
        if ($(this).parent().hasClass('error') || !$(this).val()) {
          log.push('err');
        }
      });

      if (log.length != 0) {
        alert('error');
      } else {
        alert('success');
      }
    });
  };

  return {
    init: init
  };
}(jQuery);

validate.init();