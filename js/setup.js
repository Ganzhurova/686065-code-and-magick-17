'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');

  var successfulSaveHandler = function () {
    userDialog.classList.add('hidden');
  };

  var errorHandler = function (errorMessage, wasError) {
    if (wasError) {
      var node = document.createElement('div');
      node.id = 'error-message';
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    } else {
      var errorEl = document.querySelector('#error-message');
      if (typeof (errorEl) !== 'undefined' && errorEl !== null) {
        errorEl.remove();
      }
    }
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(
        successfulSaveHandler,
        errorHandler,
        new FormData(form));

    evt.preventDefault();
  });
})();
