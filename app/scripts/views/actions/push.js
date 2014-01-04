define([
  'backbone',
  'com',
], function (Backbone, com, session) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.listenTo(com, 'player:push', this.execute, this);
      this.listenTo(com, 'player:pushed', this.execute, this);
      this.playerSquares = options.playerSquares;
    }, 

    execute: function (options) {
      options.square = options.player.get('squares').getSelected();

      console.log('player', options.player.get('name'), 'is pushing', options.row, options.col);
      if ( options.row === 'top' ) this.pushFromTop(options);
      if ( options.col === 'right' ) this.pushFromRight(options);
      if ( options.row === 'bottom' ) this.pushFromBottom(options);
      if ( options.col === 'left' ) this.pushFromLeft(options);
    },

    pushFromTop: function (options) {
      var col = options.col * 1;
      var json = _(options.square.attributes).extend({x: col, y: 'top'});

      this.collection.add(json);

      var squares = this.collection.getCol(col);
      this.collection.trigger('push:row', squares);

      _(squares).each(function (square) {
        var y = square.get('y');
        square.push('down', y === 'top' ? 0 : y + 1);
      }, this);
    },

    pushFromRight: function (options) {
      var row = options.row * 1;
      var json = _(options.square.attributes).extend({x: 'right', y: row});

      this.collection.add(json);

      var squares = this.collection.getRow(row);
      this.collection.trigger('push:col', squares);

      _(squares).each(function (square) {
        var x = square.get('x');
        square.push('left', x === 'right' ? this.collection.getWidth() : x - 1);
      }, this);
    },

    pushFromBottom: function (options) {
      var col = options.col * 1;
      var json = _(options.square.attributes).extend({x: col, y: 'bottom'});

      this.collection.add(json);

      var squares = this.collection.getCol(col);
      this.collection.trigger('push:col', squares);

      _(squares).each(function (square) {
        var y = square.get('y');
        square.push('up', y === 'bottom' ? this.collection.getHeight() : y - 1);
      }, this);
    },

    pushFromLeft: function (options) {
      var row = options.row * 1;
      var json = _(options.square.attributes).extend({x: 'left', y: row});

      this.collection.add(json);

      var squares = this.collection.getRow(row);
      this.collection.trigger('push:row', squares);

      _(squares).each(function (square) {
        var x = square.get('x');
        square.push('left', x === 'left' ? 0 : x + 1);
      });
    },

  });
});
