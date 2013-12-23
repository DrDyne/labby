define([
  'backbone',
  'models/map-square',
], function (Backbone, Square) {
  return Backbone.Collection.extend({
    model: Square,

    initialize: function (options) {
      this.width = options.width;
      this.height = options.height;
    },

    load: function (stage) {
      console.log(stage);
    },

    shuffle: function () {
      console.log('do we really need shufffling?');
    },

    getSquare: function (x, y) {
      return this.find(function (item) { return item.get('x') === x && item.get('y') === y });
    },

    getRow: function (x) {
      return []
    },

    getCol: function (y) {
      return []
    },

    hasPlayer: function (x, y) {
      return this.getSquare(x, y).hasPlayer();
    },

    isBlocker: function (x, y) {
      return this.getSquare(x, y).isBlocker();
    }
  })
});
