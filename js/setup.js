'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var removeClass = function (element, removeClassName) {
    element.classList.remove(removeClassName);
  };

  var getRandomIndex = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return rand;
  };

  var getWizardsArr = function (quantity) {
    var arr = [];

    for (var i = 0; i < quantity; i++) {
      var indexName = getRandomIndex(WIZARD_NAMES);
      var indexSurname = getRandomIndex(WIZARD_SURNAMES);
      var indexCoatColor = getRandomIndex(COAT_COLORS);
      var indexEyesColor = getRandomIndex(EYES_COLORS);

      var wizard = {
        name: WIZARD_NAMES[indexName] + ' ' + WIZARD_SURNAMES[indexSurname],
        coatColor: COAT_COLORS[indexCoatColor],
        eyesColor: EYES_COLORS[indexEyesColor]
      };

      arr.push(wizard);
    }

    return arr;
  };

  var renderWizard = function (wizard, templateWizard) {
    var wizardElement = templateWizard.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var showSimilarWizards = function (element) {
    var similarElement = element.querySelector('.setup-similar');
    var similarListElement = similarElement.querySelector('.setup-similar-list');
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');

    var fragment = document.createDocumentFragment();

    var numberWizards = 4;

    var wizards = getWizardsArr(numberWizards);

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
    }
    similarListElement.appendChild(fragment);

    removeClass(similarElement, 'hidden');
  };

  var initModule = function () {
    var userDialog = document.querySelector('.setup');

    showSimilarWizards(userDialog);
  };

  initModule();
})();
