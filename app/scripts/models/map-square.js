define([
  'backbone',
], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0,
      player: undefined,
      bonus: undefined,
      allows: ['all'],
    },

    hasPlayer: function () { return this.has('player') },
    isBlocker: function () { return !this.get('allows').length },
    toJSON: function () {
      var json = _.clone(this.attributes);
      json.cls = {};
      return json;
    },
  });
});
