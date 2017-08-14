'use strict';

var validate = validate || {};

validate = function ($) {

  var $form = $('[data-form]'),
      $submit = $('[data-submit]'),
      cls,
      log,
      check = {
    name: function name() {
      return RegExp(/^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/);
    },
    mail: function mail() {
      return RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
    },
    password: function password(min, max) {
      var min = min || '',
          max = max || '';
      return RegExp('[a-zA-Z0-9_-]{' + min + ',' + max + '}$');
    }
  },
      chkArr = ['name', 'mail', 'password', 'same'],
      chkErr = function chkErr($select, msg) {
    $select.addClass('error');
    if (!$select.is('[data-msg]')) {
      $select.find('[data-msg]').append(msg);
    } else {
      $select.append('<p>' + msg + '</p>');
    }
  },
      chk = function chk($select, obj, msg) {
    var str,
        newStr,
        minLen = $select.data('min') || '',
        maxLen = $select.data('max') || '';
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

      if ($select.find('input').val() != $target.find('input').val()) {
        chkErr($select, msg);
      }
    } else if (!check[obj](minLen, maxLen).test($select.find('input').val())) {
      chkErr($select, msg);
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
        $('[data-' + e + ']').each(function (idx, el) {
          if ($(this).hasClass('error') || !$(this).find('input').val()) {
            $(this).addClass('error');
          }
        });
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