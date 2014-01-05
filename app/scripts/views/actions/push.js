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
      if ( options.row === 'top' ) return this.pushFromTop(options);
      if ( options.col === 'right' ) return this.pushFromRight(options);
      if ( options.row === 'bottom' ) return this.pushFromBottom(options);
      if ( options.col === 'left' ) return this.pushFromLeft(options);
    },

    pushFromTop: function (options) {
      var col = options.col * 1;

      this.collection.addSquare(options.square.attributes, {x: col, y: 'top'});

      var squares = this.collection.getCol(col);
      this.collection.trigger('push:col', {direction: 'down', col: squares});

      _(squares).each(function (square) {
        var y = square.get('y');
        square.push('down', y === 'top' ? 0 : y + 1);
      }, this);

      this.collection.removeOutOfBound();
    },

    pushFromRight: function (options) {
      var row = options.row * 1;

      this.collection.addSquare(options.square.attributes, {x: 'right', y: row});

      var squares = this.collection.getRow(row);
      this.collection.trigger('push:row', {direction: 'left', row: squares});

      _(squares).each(function (square) {
        var x = square.get('x');
        square.push('left', x === 'right' ? this.collection.getWidth() : x - 1);
      }, this);

      this.collection.removeOutOfBound();
    },

    pushFromBottom: function (options) {
      var col = options.col * 1;

      this.collection.addSquare(options.square.attributes, {x: col, y: 'bottom'});

      var squares = this.collection.getCol(col);
      this.collection.trigger('push:col', {direction: 'up', col: squares});

      _(squares).each(function (square) {
        var y = square.get('y');
        square.push('up', y === 'bottom' ? this.collection.getHeight() : y - 1);
      }, this);

      this.collection.removeOutOfBound();
    },

    pushFromLeft: function (options) {
      var row = options.row * 1;

      this.collection.addSquare(options.square.attributes, {x: 'left', y: row});

      var squares = this.collection.getRow(row);
      this.collection.trigger('push:row', {direction: 'right', row: squares});

      _(squares).each(function (square) {
        var x = square.get('x');
        square.push('left', x === 'left' ? 0 : x + 1);
      });

      this.collection.removeOutOfBound();
    },

  });
});
