'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');

  var removeClass = function (element, removeClassName) {
    element.classList.remove(removeClassName);
  };

  var renderWizard = function (wizard, templateWizard) {
    var wizardElement = templateWizard.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successfulLoadHandler = function (wizards) {
    var similarElement = userDialog.querySelector('.setup-similar');
    var similarListElement = similarElement.querySelector('.setup-similar-list');
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');

    var fragment = document.createDocumentFragment();

    var numberWizards = 4;

    for (var i = 0; i < numberWizards; i++) {
      fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
    }
    similarListElement.appendChild(fragment);

    removeClass(similarElement, 'hidden');
  };

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

  var initModule = function () {
    var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
    var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
    var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');

    var form = userDialog.querySelector('.setup-wizard-form');

    window.colorize(wizardCoat, COAT_COLORS, 'coat-color');

    window.colorize(wizardEyes, EYES_COLORS, 'eyes-color');

    window.colorize(wizardFireball, FIREBALL_COLORS, 'fireball-color');

    window.backend.load(successfulLoadHandler, errorHandler);

    form.addEventListener('submit', function (evt) {
      window.backend.save(
          successfulSaveHandler,
          errorHandler,
          new FormData(form));

      evt.preventDefault();
    });
  };

  initModule();
})();
