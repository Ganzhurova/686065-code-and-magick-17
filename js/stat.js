'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 20;
  var GAP_BAR_X = 50;
  var FONT_GAP = 20;
  var BAR_WIDTH = 40;

  var splitText = function (text) {
    var stringsArr = text.split('\n');
    return stringsArr;
  };

  var isNumeric = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  var setCanvasProperties = function (ctx, color, opacity) {
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
  };

  var renderCloud = function (ctx, x, y, color, opacity) {
    setCanvasProperties(ctx, color, opacity);
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderText = function (ctx, text, x, y, color, opacity, baseLine) {
    var number = isNumeric(text);
    if (number) {
      var testedText = Math.round(text);
    } else {
      testedText = text;
    }
    setCanvasProperties(ctx, color, opacity);
    ctx.textBaseline = baseLine;
    ctx.fillText(testedText, x, y);
  };

  var renderBar = function (ctx, x, y, height) {
    ctx.fillRect(x, y, BAR_WIDTH, height);
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, 110, 20, 'rgb(0, 0, 0)', 0.7);
    renderCloud(ctx, 100, 10, '#fff', 1);

    ctx.font = '16px PT Mono';

    var message = 'Ура вы победили!\nСписок результатов:';
    var messageStrings = splitText(message);

    for (var i = 0; i < messageStrings.length; i++) {
      var messageStringX = CLOUD_X + GAP;
      var messageStringY = CLOUD_Y + GAP + FONT_GAP * i;

      renderText(ctx, messageStrings[i], messageStringX, messageStringY, '#000', 1, 'hanging');
    }

    var playerY = CLOUD_HEIGHT + CLOUD_Y - GAP;
    var barStartY = playerY - FONT_GAP;
    var barHeight = barStartY - CLOUD_Y - GAP - messageStrings.length * FONT_GAP - FONT_GAP;

    var maxTime = getMaxElement(times);

    for (i = 0; i < players.length; i++) {
      var playerX = CLOUD_X + GAP_BAR_X + (BAR_WIDTH + GAP_BAR_X) * i;
      var barHeightOfTime = (barHeight * times[i]) / maxTime;
      var barFinishX = CLOUD_X + GAP_BAR_X + (BAR_WIDTH + GAP_BAR_X) * i;
      var barFinishY = barStartY - barHeightOfTime;
      var timeX = CLOUD_X + GAP_BAR_X + (BAR_WIDTH + GAP_BAR_X) * i;
      var timeY = barFinishY;

      renderText(ctx, players[i], playerX, playerY, '#000', 1, 'bottom');
      renderText(ctx, times[i], timeX, timeY, '#000', 1, 'bottom');

      if (players[i] === 'Вы') {
        setCanvasProperties(ctx, 'rgba(255, 0, 0, 1)', 1);
      } else {
        setCanvasProperties(ctx, 'rgb(0, 0, 255)', Math.random());
      }

      renderBar(ctx, barFinishX, barFinishY, barHeightOfTime);
    }
  };
})();
