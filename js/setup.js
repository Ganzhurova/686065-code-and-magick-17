'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var removeClass = function (element, removeClassName) {
    element.classList.remove(removeClassName);
  };

  var addClass = function (element, addClassName) {
    element.classList.add(addClassName);
  };

  var getRandomIndex = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return rand;
  };

  var getIndexAscending = function (arr) {
    var i = 0;
    var getIndex = function () {
      if (i === arr.length - 1) {
        i = 0;
        return i;
      } else {
        return ++i;
      }
    };
    return getIndex;
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

  var onPopupEscPress = function (evt, element, input) {
    if (evt.keyCode === ESC_KEYCODE && input !== document.activeElement) {
      closePopup(element);
    }
  };

  var openPopup = function (element, input) {
    removeClass(element, 'hidden');
    document.addEventListener('keydown', function (evt) {
      onPopupEscPress(evt, element, input);
    });
  };

  var closePopup = function (element, input) {
    addClass(element, 'hidden');
    document.removeEventListener('keydown', function (evt) {
      onPopupEscPress(evt, element, input);
    });
  };

  var selectWizardAttributeColor = function (arr, element, index, propertyCSS, name) {
    var color = arr[index];
    var input = document.querySelector('input[name=' + name + ']');

    element.style = propertyCSS + ': ' + color;
    input.value = color;
  };

  var initModule = function () {
    var userDialog = document.querySelector('.setup');
    var userDialogOpen = document.querySelector('.setup-open');
    var userDialogClose = userDialog.querySelector('.setup-close');

    var userNameInput = userDialog.querySelector('.setup-user-name');

    var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
    var indexWizardCoat = getIndexAscending(COAT_COLORS);

    var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
    var indexWizardEyes = getIndexAscending(EYES_COLORS);

    var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
    var indexWizardFireball = getIndexAscending(FIREBALL_COLORS);

    userDialogOpen.addEventListener('click', function () {
      openPopup(userDialog, userNameInput);
    });

    userDialogOpen.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openPopup(userDialog, userNameInput);
      }
    });

    userDialogClose.addEventListener('click', function () {
      closePopup(userDialog, userNameInput);
    });

    userDialogClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closePopup(userDialog, userNameInput);
      }
    });

    userNameInput.addEventListener('invalid', function () {
      if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
      } else {
        userNameInput.setCustomValidity('');
      }
    });

    userNameInput.addEventListener('input', function (evt) {
      var target = evt.target;
      if (target.value.length < 2) {
        target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else {
        target.setCustomValidity('');
      }
    });

    wizardCoat.addEventListener('click', function () {
      selectWizardAttributeColor(COAT_COLORS, wizardCoat, indexWizardCoat(), 'fill', 'coat-color');
    });

    wizardEyes.addEventListener('click', function () {
      selectWizardAttributeColor(EYES_COLORS, wizardEyes, indexWizardEyes(), 'fill', 'eyes-color');
    });

    wizardFireball.addEventListener('click', function () {
      selectWizardAttributeColor(FIREBALL_COLORS, wizardFireball, indexWizardFireball(), 'background', 'fireball-color');
    });

    showSimilarWizards(userDialog);
  };

  initModule();
})();
