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
    mobile: function mobile() {
      return RegExp(/^09[0-9]{8}$/);
    },
    password: function password(dom, min, max) {
      var min = min || '',
          max = max || '';
      return RegExp('[a-zA-Z0-9_-]{' + min + ',' + max + '}$');
    },
    same: function same(dom) {
      var target = dom.data('same'),
          $target = $('.' + target + '');
      console.log($target.find('input').val());
      return RegExp('' + $target.find('input').val());
    }
  },
      chkErr = function chkErr($select, msg) {
    $select.addClass('error');
    if (!$select.is('[data-msg]')) {
      $select.find('[data-msg]').append(msg);
    } else {
      $select.append('<em class="err-msg">' + msg + '</em>');
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
      $select.find('.err-msg').remove('.err-msg');
    }
    if (!check[obj]($select, minLen, maxLen).test($select.find('input').val())) {
      chkErr($select, msg);
    }
  },
      init = function init() {
    $.each(check, function (i, e) {
      $('[data-' + i + ']').each(function (idx, el) {
        var $input = $(this).find('input'),
            msg = $(this).find('[data-msg]').data('msg') || $(this).data('msg');
        $input.on('blur', function () {
          chk($(el), i, msg);
        });
      });
    });
    $submit.on('click', function () {
      var log = [];
      $.each(check, function (i, e) {
        $('[data-' + i + ']').each(function (idx, el) {
          console.log(i, $(this).find('input').val());
          if ($(this).hasClass('error') || !$(this).find('input').val()) {
            $(this).addClass('error');
            log.push('err');
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