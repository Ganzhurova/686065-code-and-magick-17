'use strict';

(function () {
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

  window.colorize = function (element, arr, inputName) {
    var index = getIndexAscending(arr);

    element.addEventListener('click', function () {
      var color = arr[index()];
      var input = document.querySelector('input[name=' + inputName + ']');

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }

      input.value = color;
    });
  };
})();
