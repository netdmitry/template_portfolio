module.exports = function () {
  var validation = require('./validation');
  validation.init();
  var $form = $('#form-login, #index-form');

  function init () {
    addListener();
  }

  function addListener () {
    $form.on('submit', submitForm);
  }

  function submitForm(e) {
    var  url = 'assets/php/mail.php';
    var defObject = ajaxForm($form, url);
    e.preventDefault();  
  }

  function ajaxForm(form, url) {
    if (!validation.validateForm(form)) {
      console.log('Валидация не пройдена ');
      return false;
    }

    data = form.serialize();

    var result = $.ajax({
        url: url,
        data:data,
        dataType: 'json',
        type: 'POST'
    }).done(function () {
       alert('THANK YOU');
      setTimeout(function () {
        $(this).trigger('reset', _clearForm);
      }, 1000);
    });
    return false;

  }

  if ($form.length !==0) {
    init();
  }
};
