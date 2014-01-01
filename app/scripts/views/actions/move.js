define([
  'backbone',
  'com',
  'session',
], function (Backbone, com, session) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.listenTo(com, 'player:move', this.execute, this);
      this.listenTo(com, 'player:moved', this.execute, this);
    },

    execute: function (options) {
      var direction = options.direction, player = options.player;
      if ( !player ) player = session.get('player'); // ry we should use id for com instead of bb models
      console.log('moving player!', player, direction);
    },
  });
});
