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
    events: {
      'submit #welcome-menu': 'onClickStart'
    },

    initialize: function (options) {
      this.splashScreen = new SplashScreen();
      this.splashScreen.start();
    },

    onClickStart: function (event) {
      event.preventDefault();
      var selectedStage = this.$el.find('#select-stage').val();
      console.log('loading', selectedStage);
      this.start(selectedStage);
    },

    start: function (stage) {
      this.map = new Map({layout: stage});
      this.map.render();
    },

  });
});
