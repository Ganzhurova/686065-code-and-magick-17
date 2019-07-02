'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var userDialog = document.querySelector('.setup');
  var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');

  var wizard = {
    coat: {
      colorArr: COAT_COLORS,
      inputName: 'coat-color',
      onElementChange: function () {}
    },
    eyes: {
      colorArr: EYES_COLORS,
      inputName: 'eyes-color',
      onElementChange: function () {}
    },
    fireball: {
      colorArr: FIREBALL_COLORS,
      inputName: 'fireball-color',
    }
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

  var colorize = function (element, propertyWizard) {
    var componentWizard = wizard[propertyWizard];

    var index = getIndexAscending(componentWizard.colorArr);
    var input = document.querySelector('input[name=' + componentWizard.inputName + ']');

    element.addEventListener('click', function () {
      var color = componentWizard.colorArr[index()];

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }

      input.value = color;

      if (componentWizard.onElementChange) {
        componentWizard.onElementChange(color);
      }
    });
  };

  colorize(wizardCoat, 'coat');
  colorize(wizardEyes, 'eyes');
  colorize(wizardFireball, 'fireball');

  window.wizard = wizard;
  return window.wizard;
})();
