//ry this game view will 
  // 1. splahscreen
  // 2. give instructions on how to play
  // 3. prompt menu
define([
  'backbone',
  'ws',
  'models/game',
  'views/splashScreen',
  'views/map',
], function (Backbone, ws, Game, SplashScreen, Map) {
  return Backbone.View.extend({
    events: {
      'submit #welcome-menu': 'onPlayerCreate',
      'change #select-stage': 'onSelectStage',
    },

    initialize: function (options) {
      this.splashScreen = new SplashScreen();
      this.splashScreen.start();
      ws.on('players', this._ws.onPlayers.bind(this));
      ws.emit('game:init', this.id);
    },

    start: function (stage) {
      this.map = new Map({layout: stage});
      this.map.render();
    },

    onPlayerCreate: function (event) {
      event.preventDefault();
      var playerName = this.$el.find('#player-name').val();
      ws.emit('player:create', playerName);
      this.$el.find('.select-stage-container').removeClass('hidden');
    },

    onSelectStage: function (event) {
      var selectedStage = this.$el.find('#select-stage').val();
      this.start(selectedStage);
    },

    _ws: {
      onPlayers: function (data) {
        this.$el.find('p.player-list').html(data.join(', '));
      }
    },
  });
});
