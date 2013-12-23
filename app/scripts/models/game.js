define([
  'backbone',
  'views/menu',
  'models/player',
], function (Backbone, Menu, Player) {
  return Backbone.Model.extend({
    initialize: function (options) {
      this.menu = new menu();

      this.listenTo(this.menu, 'new:player', this.createPlayer.bind(this));
    },

    createPlayer: function (options) {
      this.players.add(options);
      console.log(this.players);
    },
  });
});

