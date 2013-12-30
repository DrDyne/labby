define(['backbone', 'com'], function (Backbone, com) {
  var Session = Backbone.Model.extend({
    defaults: {
      player: undefined,
      game: undefined,
    },

    isMyTurn: function () {
      return true; //ry hack
      return this.get('game').isPlayerTurn(this.get('player'));
    },

  });

  return new Session();
});
