'use strict';

var validate = validate || {};

validate = function ($) {

  var $form = $('.form'),
      $submit = $('[data-submit]'),
      cls,
      log,
      check = {
    name: /^[a-zA-Z0-9_-]{4,16}$/, //4到16位（字母，數字，底線，連接線 ）
    mail: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    password: /^[a-zA-Z0-9_-]{8,}$/
  },
      chkName = function chkName(dom) {
    dom.each(function (i, e) {
      cls = !check.name.test($(this).val()) ? 'addClass' : 'removeClass';
      $(this).parent()[cls]('error');
    });
  },
      chkMail = function chkMail(dom) {
    dom.each(function () {
      cls = !check.mail.test($(this).val()) ? 'addClass' : 'removeClass';
      $(this).parent()[cls]('error');
    });
  },
      chkPassword = function chkPassword(dom) {
    dom.each(function () {
      cls = !check.password.test($(this).val()) ? 'addClass' : 'removeClass';
      $(this).parent()[cls]('error');
    });
  },
      chkSame = function chkSame(dom) {
    var target = dom.data('same'),
        $target = $('.' + target + '');
    cls = dom.val() != $target.val() ? 'addClass' : 'removeClass';
    dom.parent()[cls]('error');
  },
      init = function init() {

    $form.find('input').each(function () {
      log = [];
      $(this).on('blur', function () {
        chkName($('[data-name]'));
        chkMail($('[data-mail]'));
        chkPassword($('[data-password]'));
        chkSame($('[data-same]'));
      });
    });
    $submit.on('click', function () {
      var log = [];
      $form.find('input').each(function (i, e) {
        if ($(this).parent().hasClass('error') || !$(this).val()) {
          console.log('err');
          log.push('err');
        } else {
          console.log('succ');
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