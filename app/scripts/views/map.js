//ry this map view will instanciate a collection of squares
define([
  'backbone',
  'collections/map',
  'resources/layouts',
], function (Backbone, Map, Layouts) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.collection = new Map({
        width: options.width,
        height: options.height
      });

      this.collection.load(Layouts.stage1);
      this.collection.shuffle();

      this.bindPushables();
    },

    bindPushables: function () {
      for ( var x = 0 ; x < this.collection.get('width'); x++ ) {
        this.isPushable('up', x);
        this.isPushable('down', x);
        console.log([this.isPushable('up', x), this.isPushable('down', x)]);
      }
      for ( var y = 0; y < this.collection.get('height'); y++ ) {
        this.isPushable('left', y);
        this.isPushable('right', y);
        console.log([this.isPushable('left', y), this.isPushable('right', y)]);
      }
    },

    //ry direction = up right down left
    // coord = X or Y
    isPushable: function (direction, coord) {
      var blocked = false;

      if ( direction === 'up' || direction === 'down' ) {
        var x = coord;
        if ( direction === 'up' && this.collection.hasPlayer(x, 0) )
          return false;
        if ( direction === 'down' && this.collection.hasPlayer(x, this.collection.get('height')) )
          return false;

        for ( var y = 0; y < this.collection.get('height'); y++ ) {
          if ( this.collection.isBlocker(x, y) ) blocked = true;
        }
        return !blocked;
      }

      if ( direction === 'right' || direction === 'left' ) {
        var y = coord;
        if ( direction === 'right' && this.collection.hasPlayer(this.collection.get('width'), y) )
          return false;
        if ( direction === 'left' && this.collection.hasPlayer(0, y) )
          return false;
        for ( var x = 0; x < this.collection.get('width'); x++ ) {
          if ( this.collection.isBlocker(x, y) ) blocked = true;
        }
        return !blocked;
      }
    },
  });
});
