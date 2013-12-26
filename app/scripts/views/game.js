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
      com.on('game:create', this.createGame.bind(this));
      com.on('game:join', this.joinGame.bind(this));
    },

    createGame: function (options) {
      this.hud = new Hud({el: '#hud'});
      this.hud.render();

      this.map = new Map({el: '#map', layout: options.stage});

      this.game = new Game({
        name: options.name,
        stage: options.stage,
      });
      this.game.addPlayer(session.get('player'));

      this.map.render();
      com.emit('game:created', this.game.toJSON());
    },

    joinGame: function (options) {
      console.log('join game', options);
    },

  });
});
