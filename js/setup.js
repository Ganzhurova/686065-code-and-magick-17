'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var wizards = [];
  var numberWizards = 4;

  var getRandomIndex = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return rand;
  };

  var getWizardsArr = function (quantity, arr) {
    for (var i = 0; i < quantity; i++) {
      var indexName = getRandomIndex(WIZARD_NAMES);
      var indexSurname = getRandomIndex(WIZARD_SURNAMES);
      var indexCoatColor = getRandomIndex(coatColors);
      var indexEyesColor = getRandomIndex(eyesColors);

      var wizard = {
        name: WIZARD_NAMES[indexName] + ' ' + WIZARD_SURNAMES[indexSurname],
        coatColor: coatColors[indexCoatColor],
        eyesColor: eyesColors[indexEyesColor]
      };

      arr.push(wizard);
    }

    return arr;
  };

  wizards = getWizardsArr(numberWizards, wizards);

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
