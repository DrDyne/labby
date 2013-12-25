//ry this map view will instanciate a collection of squares
define([
  'backbone',
  'collections/map',
  'templates/index',
], function (Backbone, Map, tpl) {
  return Backbone.View.extend({
    el: '.map',

    initialize: function (options) {
      this.collection = new Map({layout: options.layout});
      this.collection.renderLayout();
      this.bindPushables();
    },

    bindPushables: function () {
      _(this.collection.cols()).each(function (col, index) {
        this.isPushable('up', index);
        this.isPushable('down', index);
        //console.log(index, 'up', this.isPushable('up', index), 'down', this.isPushable('down', index));
      }, this);

      _(this.collection.rows()).each(function (row, index) {
        this.isPushable('left', index);
        this.isPushable('right', index);
        //console.log(index, 'left', this.isPushable('left', index), 'right', this.isPushable('right', index));
      }, this);
    },

    //ry direction = up right down left
    // coord = X or Y
    isPushable: function (direction, coord) {
      var blocked = false;

      if ( direction === 'up' || direction === 'down' ) {
        var x = coord;
        if ( direction === 'up' && this.collection.hasPlayer(x, 0) )
          return false;
        if ( direction === 'down' && this.collection.hasPlayer(x, this.collection.getHeight()) )
          return false;

        for ( var y = 0; y < this.collection.getHeight(); y++ ) {
          if ( this.collection.isBlocker(x, y) ) blocked = true;
        }
        return !blocked;
      }

      if ( direction === 'right' || direction === 'left' ) {
        var y = coord;
        if ( direction === 'right' && this.collection.hasPlayer(this.collection.getWidth(), y) )
          return false;
        if ( direction === 'left' && this.collection.hasPlayer(0, y) )
          return false;
        for ( var x = 0; x < this.collection.getWidth(); x++ ) {
          if ( this.collection.isBlocker(x, y) ) blocked = true;
        }
        return !blocked;
      }
    },

    render: function () {
      var surface = this.$el.find('.map-surface');

      surface.html('');
      _(this.collection.rows()).each(function (row, index) {
        row.index = index;
        var mapRow = $(tpl.mapRow(row));
        _(row).each(function (square) {
          var json = square.toJSON();
          mapRow.append(tpl.mapSquare(json))
        });
        surface.append(mapRow);
      });
      return this;
    },

    findPlayerSquare: function (player) {
      return this.collection.find(function (item) {
        return item.hasPlayer() && item.get('player') === player
      });
    },

    whereToMove: function (player) {
      var square = this.findPlayerSquare(player);
      console.log(player, 'in', square);
    },

  });
});
