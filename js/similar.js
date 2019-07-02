'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.eyes.onElementChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.coat.onElementChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var successfulLoadHandler = function (data) {
    wizards = data;
    updateWizards();
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

  window.backend.load(successfulLoadHandler, errorHandler);
})();
