'use strict';

angular.module('avatarGenerator')
  .controller('generatorController', GeneratorController);

function GeneratorController() {
  var self = this;
  var firstColor, secondColor, randomNumber;
  var avatarArray = new Array(5);
  var selector = '';
  var canvas = document.getElementById('canvasOutput');
  var ctx = canvas.getContext('2d');
  
  self.generateAvatar = generateAvatar;
  
  // init
  activate();
  
  function activate() {
    generateAvatar();
  }

  function generateAvatar() {
    randomNumber = Math.random().toString(16).toUpperCase(); // Create a random number using hexidecimal values
    firstColor = '#' + randomNumber.slice(2, 8);
    secondColor = '#' + randomNumber.slice(8, 14);
    for (var i = 0; i < 5; i++) {
      avatarArray[i] = new Array(5);
      for (var j = 0; j < 3; j++) {
        avatarArray[i][j] = Math.floor(Math.random() * 2) ? firstColor : secondColor;
        selector = '.row' + i + ' .cell' + j;
        angular.element(selector).css('background-color', avatarArray[i][j]);
        // Mirror
        avatarArray[i][4-j] = avatarArray[i][j];
        selector = '.row' + i + ' .cell' + (4-j);
        angular.element(selector).css('background-color', avatarArray[i][4-j]);
        ctx.fillStyle = avatarArray[i][j];
        ctx.fillRect(j*50,i*50,50,50);
        ctx.fillStyle = avatarArray[i][4-j];
        ctx.fillRect((4-j)*50,i*50,50,50);
      }
    }
  }
}
