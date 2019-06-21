'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var removeClass = function (element, removeClassName) {
    element.classList.remove(removeClassName);
  };

  var addClass = function (element, addClassName) {
    element.classList.add(addClassName);
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
    element.removeAttribute('style');
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

  var validationUserNameInput = function (elUserNameInput) {
    if (elUserNameInput.validity.tooShort) {
      elUserNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (elUserNameInput.validity.tooLong) {
      elUserNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (elUserNameInput.validity.valueMissing) {
      elUserNameInput.setCustomValidity('Обязательное поле');
    } else {
      elUserNameInput.setCustomValidity('');
    }
  };

  var checkUserNameInput = function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  };

  var moveUserDialog = function (evt, elUserDialog, elDialogHandler) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      elUserDialog.style.top = (elUserDialog.offsetTop - shift.y) + 'px';
      elUserDialog.style.left = (elUserDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          elDialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        elDialogHandler.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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

    var dialogHandler = userDialog.querySelector('.upload');

    var shopElement = document.querySelector('.setup-artifacts-shop');
    var artifactsElement = document.querySelector('.setup-artifacts');
    var draggedItem = null;

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
      validationUserNameInput(userNameInput);
    });

    userNameInput.addEventListener('input', function (evt) {
      checkUserNameInput(evt);
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

    dialogHandler.addEventListener('mousedown', function (evt) {
      moveUserDialog(evt, userDialog, dialogHandler);
    });

    shopElement.addEventListener('dragstart', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        draggedItem = evt.target;
        evt.dataTransfer.setData('text/plain', evt.target.alt);
      }
    });

    artifactsElement.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      return false;
    });

    artifactsElement.addEventListener('drop', function (evt) {
      evt.target.style.backgroundColor = '';
      evt.target.appendChild(draggedItem);
    });

    artifactsElement.addEventListener('dragenter', function (evt) {
      evt.target.style.backgroundColor = 'yellow';
      evt.preventDefault();
    });

    artifactsElement.addEventListener('dragleave', function (evt) {
      evt.target.style.backgroundColor = '';
      evt.preventDefault();
    });
  };

  initModule();
})();
