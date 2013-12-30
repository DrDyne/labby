define([
  'backbone',
  'com',
  'session',
  'models/game',
  'views/map',
  'views/game-hud',
], function (Backbone, com, session, Game, Map, Hud, Layouts) {
  return Backbone.View.extend({
    initialize: function (options) {
      com.on('game:host', this.createGame.bind(this));
      com.on('game:join', this.joinGame.bind(this));
    },

    createGame: function (options) {
      this.game = new Game({
        name: options.name,
        stage: options.stage,
      });
      this.game.addPlayer(session.get('player'));
      session.set('game', this.game);

      this.hud = new Hud({el: '#hud', model: this.game});
      this.hud.render();

      this.map = new Map({el: '#map', model: this.game, layout: options.stage});
      this.map.render();

      com.trigger('game:created', this.game.toJSON());
    },

    joinGame: function (options) {
      console.log('join game', options);
    },

  });
kk});
