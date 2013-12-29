define([
  'backbone',
  'resources/layouts',
], function (Backbone, Resources) {
  var Layout = Backbone.Model.extend({
    defaults: {
      width: 0,
      height: 0,
      map: [],
    }
  });

  var Square = Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0,
      player: undefined,
      bonus: undefined,
      allows: ['all'],
      type: undefined,
    },

    allowsAll: function () { return 'all' === this.get('allows').toString() },
    allows: function (direction) {
      if ( this.allowsAll() ) return true;
      return _(this.get('allows')).contains(direction);
    },

    hasPlayer: function (player) {
      if ( !player ) return this.has('player');
      return this.get('player') === player.get('id');
    },

    isBlocker: function () { return !this.get('allows').length },
    toJSON: function () {
      var json = _.clone(this.attributes);
      json.cls = {};
      json.allows = this.get('allows').join('-')
      return json;
    },
  });

  return Backbone.Collection.extend({
    model: Square,
    layout: undefined,

    loadLayout: function (layoutName) {
      this.layout = new Layout(Resources[layoutName]);
      this.width = this.layout.get('itemsPerRow');
      this.height = this.layout.get('map').length / this.layout.get('itemsPerRow');

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
    },

    getPlayerSquare: function (player) {
      return this.find(function (item) {
        return item.hasPlayer(player);
      });
    },

  })
});
