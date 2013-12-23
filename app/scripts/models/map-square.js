define([
  'backbone',
], function (Backbone) {
  return Backbone.Model.extend({
    attributes: {
      x: 0,
      y: 0,
      player: undefined,
      bonus: undefined,
      allows: ['all'],
    },

    hasPlayer: function () { return this.has('player') },
    isBlocker: function () { return !this.get('allows').length },
  });
});
