define([
  'backbone',
  'collections/players',
], function (Backbone, Players) {
  return Backbone.Model.extend({
    defaults: {
      name: undefined,
      players: [], // player names
      stage: undefined, // stage name
      max: 2, // max nb of players
      status: 'waiting', // waiting | playing
      turn: {
        actions: ['move', 'use', 'push'],
        player: undefined,
      },
    },

    initialize: function () {
      this.set('players', new Players());
    },

    addPlayer: function (player) {
      player.set('index', this.get('players').length);

      if ( this.get('players').isEmpty() ) {
        this.get('players').setCurrent(player);
      }

      this.get('players').add(player);
    },

    findPlayer: function (name) {
      return this.get('players').find(function (player) { return player.get('id') === name });
    },

    newTurn: function (playerName) {
      var turn = {};
      turn.actions = ['move', 'use', 'push'],
      turn.player = this.get('players').next();

      this.set('turn', turn);
    },

    toJSON: function () { return this.attributes },
  });
});
