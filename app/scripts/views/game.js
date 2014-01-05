define([
  'backbone',
  'com',
  'session',
  'models/game',
  'views/map',
  'views/game-hud',
  'views/actions/index',
], function (Backbone, com, session, Game, Map, Hud, Actions) {
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

      this.map = new Map({el: '#map', model: this.game, layout: options.stage});

      this.actions = {
        push: new Actions.Push({ collection: this.map.collection, playerSquares: session.get('player').get('squares') }),
        move: new Actions.Move({ collection: this.map.collection }),
        use: new Actions.Use({ collection: this.map.collection }),
      };

      com.trigger('game:created', this.game.toJSON());


      //ry hack, this will be placed in an initGame() method that will be called when all players have joined
      session.get('player').get('squares').add({allows: ['up', 'right']});
      session.get('player').get('squares').add({allows: ['right', 'left']});
      session.get('player').get('squares').add({allows: ['all']});
      session.get('player').get('squares').add({allows: []});
    },

    joinGame: function (options) {
      console.log('join game', options);
    },

  });
});
