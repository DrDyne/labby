define([
  'backbone',
  'com',
  'models/game',
  'views/splashScreen',
  'views/map',
  'views/game-hud',
  'views/game-menu',
], function (Backbone, com, Game, SplashScreen, Map, Hud, Menu) {
  return Backbone.View.extend({
    events: {
      'submit #welcome-menu': 'onPlayerCreate',
      'change #select-stage': 'onSelectStage',
    },

    initialize: function (options) {
      this.splashScreen = new SplashScreen();
      this.splashScreen.start();
      com.on('players', this.com.onPlayers.bind(this));
      com.emit('game:init', this.id);
    },

    createMap: function (stage) {
      this.map = new Map({layout: stage});
      this.map.render();
    },

    waitingForPlayer: function () {
      alert('waiting for players...');
    },

    onPlayerCreate: function (event) {
      event.preventDefault();
      var playerName = this.$el.find('#player-name').val();
      com.emit('player:create', playerName);
      this.$el.find('.select-stage-container').removeClass('hidden');
    },

    onSelectStage: function (event) {
      var selectedStage = this.$el.find('#select-stage').val();
      this.createMap(selectedStage);
      this.waitingForPlayer();
    },

    com: {
      onPlayers: function (options) {
        this.$el.find('p.player-list').html(options.join(', '));
      },
    },
  });
});
