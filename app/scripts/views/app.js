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
      com.on('player:connected', this.showPlayerNb.bind(this));
      com.trigger('app:init', this.id);
      com.trigger('lobby:games');
    },

    onPlayerCreate: function (event) {
      event.preventDefault();
      var playerName = this.$el.find('#player-name').val();
      com.trigger('player:create', playerName);
      session.set('player', new Player({name: playerName}));
      this.menu.show();
      this.hidePlayerNameMenu();
    },

    hidePlayerNameMenu: function () {
      this.$el.find('#welcome-menu').slideUp();
    },

    showPlayerNb: function (count) {
      this.$el.find('span.player-list').html(count);
    },
  });
});
