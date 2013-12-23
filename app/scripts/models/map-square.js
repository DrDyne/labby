define([
  'backbone',
], function (Backbone) {
  return Backbone.Model.extend({
    attributes: {
      x: 0,
      y: 0,
      player: undefined,
      bonus: undefined,
      allow: ['all'],
    },

    hasPlayer: function () { return this.has('player') },
    isBlocker: function () { console.log(!!this.get('allow').length ); return !!this.get('allow').length },
  });
});
