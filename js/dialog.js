'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var removeClass = function (element, removeClassName) {
    element.classList.remove(removeClassName);
  };

  var addClass = function (element, addClassName) {
    element.classList.add(addClassName);
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
