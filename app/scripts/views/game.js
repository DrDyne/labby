//ry this game view will 
  // 1. splahscreen
  // 2. give instructions on how to play
  // 3. prompt menu
define([
  'backbone',
  //'backbone.io',
  'models/game',
  'views/splashScreen',
  'views/map',
], function (Backbone, Game, SplashScreen, Map) {
  return Backbone.View.extend({
    el: 'map',
    initialize: function (options) {
      console.log(this.$el);
      //Backbone.io.connect();
      console.log('initializing game');
      this.splashScreen = new SplashScreen();
      this.map = new Map({width: 3, height: 3});
    },

    start: function () {
      this.splashScreen.start();
    },

  });
});
