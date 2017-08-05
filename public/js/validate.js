'use strict';

var validate = validate || {};

validate = function ($) {

  var $form = $('[data-form]'),
      $submit = $('[data-submit]'),
      cls,
      log,
      check = {
    name: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/,
    mail: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    password: /^[a-zA-Z0-9_-]{8,}$/
  },
      chkArr = ['name', 'mail', 'password', 'same'],
      chk = function chk($select, obj, msg) {

    var str, newStr;

    $select.removeClass('error');

    if (!$select.is('[data-msg]')) {
      str = $select.find('[data-msg]').text();
      newStr = str.replace(msg, '');
      $select.find('[data-msg]').text(newStr);
    } else {
      $select.find('p').remove('p');
    }

    if (obj === 'same') {
      var target = $select.data('same'),
          $target = $('.' + target + '');
      $select.find('input').val() != $target.find('input').val() ? $select.addClass('error') : '';
    } else if (!check[obj].test($select.find('input').val())) {
      $select.addClass('error');
      if (!$select.is('[data-msg]')) {
        $select.find('[data-msg]').append(msg);
      } else {
        $select.append('<p>' + msg + '</p>');
      }
    }
  },
      init = function init() {
    $.each(chkArr, function (i, e) {
      $('[data-' + e + ']').each(function (idx, el) {
        var $input = $(this).find('input'),
            msg = $(this).find('[data-msg]').data('msg') || $(this).data('msg');
        $input.on('blur', function () {
          chk($(el), e, msg);
        });
      });
    });
    $submit.on('click', function () {
      var log = [];
      $.each(chkArr, function (i, e) {
        if ($('[data-' + e + ']').hasClass('error') || !$('[data-' + e + ']').find('input').val()) {
          $('[data-' + e + ']').addClass('error');
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