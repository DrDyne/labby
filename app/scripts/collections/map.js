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
      x: undefined,
      y: undefined,
      player: undefined,
      bonus: undefined,
      allows: ['all'],
      type: undefined,
    },

    isBlocker: function () { return !this.get('allows').length },
    allowsAll: function () { return 'all' === this.get('allows').toString() },
    allows: function (direction) {
      if ( this.allowsAll() ) return true;
      return _(this.get('allows')).contains(direction);
    },

    hasPlayer: function (player) {
      if ( !player ) return this.has('player');
      return this.get('player') === player.get('id');
    },

    pos: function () { return { x: this.get('x'), y: this.get('y') } },

    rotate: function (direction) {
      if ( this.isBlocker() ) return;
      if ( this.allowsAll() ) return;
      if ( 'right' === direction ) return this.rotateClockwise();
      if ( 'left'  === direction ) return this.rotateAntiClockwise();
    },

    rotateClockwise: function () {
      var newAllows = [];
      if ( this.allows('left') ) newAllows.push('up');
      if ( this.allows('up') ) newAllows.push('right');
      if ( this.allows('right') ) newAllows.push('down');
      if ( this.allows('down') ) newAllows.push('left');
      this.set('allows', newAllows);
    },

    rotateAntiClockwise: function () {
      var newAllows = [];
      if ( this.allows('right') ) newAllows.push('up');
      if ( this.allows('down') ) newAllows.push('right');
      if ( this.allows('left') ) newAllows.push('down');
      if ( this.allows('up') ) newAllows.push('left');
      this.set('allows', newAllows);
    },

    push: function (direction, value) {
      if ( direction === 'up' || direction === 'down' ) this.set('y', value);
      if ( direction === 'left' || direction === 'right' ) this.set('x', value);
    },

    toJSON: function () {
      var json = _.clone(this.attributes);
      json.allows = this.get('allows').join('-')
      json.cls = {};
      json.cls.selected = this.get('selected') === true ? 'selected' : '';
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
      var squares = this.filter(function (item) { return item.get('y') === y });
      return _(squares).sortBy(function (item) { return item.get('x') });
    },

    getCol: function (x) {
      var squares = this.filter(function (item) { return item.get('x') === x });
      return _(squares).sortBy(function (item) { return item.get('y') });
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

    select: function (index) {
      this.invoke('set', 'selected', false);
      this.at(index).set('selected', true);
    },

    getSelected: function () { return this.find(function (item) { return item.get('selected') }) },

    allows: function (options) { // x, y, direction
      if ( !options ) options = {};
      if ( options.square ) {
        options.x = square.get('x');
        options.y = square.get('y');
      }

      if ( this.allowsAll() ) return true;
      return _(this.get('allows')).contains(direction);
    },

    toJSON: function () { return this.map(function (item) { return item.toJSON() }) },
  })
});
