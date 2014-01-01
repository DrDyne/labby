define([
  'backbone',
  'com',
  'session',
], function (Backbone, com, session) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.listenTo(com, 'player:push', this.execute, this);
      this.listenTo(com, 'player:pushed', this.execute, this);
      this.playerSquares = options.playerSquares;
    }, 

    getDirection: function (options) {
      if ( options.row === 'top' ) return 'down';
      if ( options.col === 'right' ) return 'left';
      if ( options.row === 'bottom' ) return 'up';
      if ( options.col === 'left' ) return 'right';
      return undefined
    },

    execute: function (options) {
      var direction = this.getDirection(options), player = options.player;
      if ( !player ) player = session.get('player');
      console.log('pushing square:', this.playerSquares.getSelected());

      console.log('player', player.get('name'), 'is pushing', options.row, options.col, 'in', direction);
    },

  });
});
