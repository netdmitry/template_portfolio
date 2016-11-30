module.exports = (function() {
  var init = function () {
      _setUpListeners();
    };
  
  var validateForm = function(form) {
    var elements = form.find('input, textarea').not('input[type="hidden"]');
    var valid = true;

    $.each(elements, function(index, element) {
      var $element = $(element);
      var value = $element.val();
      if (!value.length) {
        _addError($element);
        valid = false;
      }
    });
    return valid;
  };
  var _setUpListeners = function () {
      var $form = $('form');
      $form.on('focus', '.has-error', _removeError);
      $form.on('keydown', '.has-error', _removeError);
      $form.on('click', '.has-error', _removeError);
      $form.on('reset', _clearForm);
  };
  var _removeError = function () {
    $(this).removeClass('has-error');
  };
  var _addError = function (element) {
    element.addClass('has-error');
    _createQtip(element, element.data('position'));
  };
  var _clearForm = function (e) {
    var $form = $(this);
    $form.find('input, textarea').trigger('hideTooltip');
    $form.find('.has-error').removeClass('has-error');
  };
  var _createQtip = function (element, position) {
    if (position === 'right') {
      position = {
        my : 'left top',
        at : 'top right'
      }
    } else {
      position = {
        my : 'left top',
        at : 'top right',
        adjust : {
          method : 'shift none'
        }
      }
    };
    element.qtip({
      content : {
        text: function () {
          return $(this).data('content');
        }
      },
      show: {
        event : 'show'
      },
      hide : {
        event : 'keydown click hideTooltip'
      },
      position: position,
      style : {
        classes : 'qtip-mystyle qtip-rounded',
        tip : {
          height: 20,
          width: 20
        }
      }
    }).trigger('show');
  };
  
  return {
    init: init,
    validateForm: validateForm
  }; 
})();