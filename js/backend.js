'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';

  var xhrFunction = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onError('', false);
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText, true);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', true);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', true);
    });

    xhr.timeout = 10000;

    if (data) {
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    } else {
      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };

  window.backend = {
    save: xhrFunction,

    load: xhrFunction
  };
})();
