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

    getPlayers: function () {
      return this.get('players');
    },

    addPlayer: function (player) {
      var index = this.get('players').length;
      player.set('index', index);
      player.set('id', 'player' + (index + 1));

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

    isPlayerTurn: function (player) {
      console.log('is player turn', this.get('turn').player);
      return this.get('turn').player.get('id') === player.get('id');
    },

    toJSON: function () { return this.attributes },
  });
});
