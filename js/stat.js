'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var GAP_BAR_X = 50;
var FONT_GAP = 20;
var BAR_WIDTH = 40;

var playerY = CLOUD_HEIGHT + CLOUD_Y - GAP;
var barStartY = playerY - FONT_GAP;
var barHeight = barStartY - CLOUD_Y - GAP - FONT_GAP * 3;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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


window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';

  var message = 'Ура вы победили!\nСписок результатов:';
  var messageStrings = message.split('\n');
  var messageStringX = CLOUD_X + GAP;

  for (var i = 0; i < messageStrings.length; i++) {
    var messageString = messageStrings[i];
    var messageStringY = CLOUD_Y + GAP + FONT_GAP * i;
    ctx.fillText(messageString, messageStringX, messageStringY);
  }

  ctx.textBaseline = 'bottom';

  var maxTime = getMaxElement(times);

  for (i = 0; i < players.length; i++) {
    var barHeightOfTime = (barHeight * times[i]) / maxTime;
    var barFinishY = barStartY - barHeightOfTime;
    var timeY = barFinishY;

    ctx.fillStyle = '#000';
    ctx.globalAlpha = 1;
    ctx.fillText(players[i], CLOUD_X + GAP_BAR_X + (BAR_WIDTH + GAP_BAR_X) * i, playerY);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_BAR_X + (BAR_WIDTH + GAP_BAR_X) * i, timeY);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgb(0, 0, 255)';
      ctx.globalAlpha = Math.random();
    }

    ctx.fillRect(CLOUD_X + GAP_BAR_X + (BAR_WIDTH + GAP_BAR_X) * i, barFinishY, BAR_WIDTH, barHeightOfTime);
  }
};
