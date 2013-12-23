define([
  'backbone',
], function (Backbone) {
  return Backbone.View.extend({
    events: {
      'click .play': 'play',
    },
    
    play: function (event) {
      event.preventDefault();
      var playerName =this.$el.find('.player-name').val();
      if ( !playerName ) return;

      this.trigger('new:player', {name: playerName});
    }
  });
});
