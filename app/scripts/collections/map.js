define([
  'backbone',
  'models/map-square',
  'models/layout',
  'resources/layouts',
], function (Backbone, Square, Layout, Resources) {
  return Backbone.Collection.extend({
    model: Square,
    layout: undefined,

    initialize: function (options) {
      if ( options.layout ) this.loadLayout(options.layout);
    },

    loadLayout: function (layoutName) {
      this.layout = new Layout(Resources[layoutName]);
      this.width = this.layout.get('itemsPerRow');
      this.height = this.layout.get('map').length / this.layout.get('itemsPerRow');
    },

    renderLayout: function () {
      this.reset();

      var map = _.clone(this.layout.get('map'));
      for ( var y = 0; y < this.height; y++ ) {
        for ( var x = 0; x < this.width; x++ ) {
          this.add(_.extend(map.shift(), {x: x, y: y}));
        }
      }
    },

    rows: function () {
      var rows = [];
      for ( var y = 0; y < this.height; y++ ) rows.push(this.getRow(y));
      return rows;
    },

    cols: function () {
      var cols = [];
      for ( var x = 0; x < this.width; x++ ) cols.push(this.getCol(x));
      return cols;
    },

    getWidth: function () { return this.width - 1 },
    getHeight: function () { return this.height - 1 },

    getSquare: function (x, y) {
      var square = this.find(function (item) { return item.get('x') === x && item.get('y') === y });
      if ( !square ) throw "Could not find square [" + x + "," + y + "]";
      return square;
    },

    getRow: function (y) {
      return this.filter(function (item) { return item.get('y') === y });
    },

    getCol: function (x) {
      return this.filter(function (item) { return item.get('x') === x });
    },

    hasPlayer: function (x, y) {
      return this.getSquare(x, y).hasPlayer();
    },

    isBlocker: function (x, y) {
      return this.getSquare(x, y).isBlocker();
    }
  })
});