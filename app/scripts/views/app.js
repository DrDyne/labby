define([
  'backbone',
  'com',
  'session',
  'models/player',
  'views/game',
  'views/app-splashScreen',
  'views/app-menu',
], function (
  Backbone,
  com,
  session,
  Player,
  Game,
  SplashScreen,
  Menu
) {
  return Backbone.View.extend({
    events: {
      'submit #welcome-menu': 'onPlayerCreate',
    },

    initialize: function (options) {
      this.splashScreen = new SplashScreen({el: 'body'});
      this.menu = new Menu({el: "#menu"});
      this.game = new Game({el: '#game'});

      this.splashScreen.start();
      com.ws.on('players', this.onPlayers.bind(this));
      com.ws.emit('game:init', this.id);
    },

    onPlayerCreate: function (event) {
      event.preventDefault();
      var playerName = this.$el.find('#player-name').val();
      com.ws.emit('player:create', playerName);
      session.set('player', new Player({name: playerName}));
      this.menu.show();
      this.hidePlayerNameMenu();
    },

    hidePlayerNameMenu: function () {
      this.$el.find('#welcome-menu').slideUp();
    },

    onPlayers: function (options) {
      this.$el.find('p.player-list').html(options.join(', '));
    },
  });
});
