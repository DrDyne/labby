define([
  'backbone',
  'models/player',
], function (Backbone, Player) {
  return Backbone.Collection.extend({
    model: Player,
    setCurrent: function (player) { this._currentPlayer = player },
    next: function () {
      if ( this._currentPlayer.get('index') === this.length ) return this.at(0);
      return this.at(this._currentPlayer.get('index') + 1)
    },
  });
});
