'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var similarElement = userDialog.querySelector('.setup-similar');
  var similarListElement = similarElement.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');

    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.render = function (data) {
    var takeNumber = data.length > 4 ? 4 : data.length;
    var fragment = document.createDocumentFragment();

    similarListElement.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);

    similarElement.classList.remove('hidden');
  };
})();
