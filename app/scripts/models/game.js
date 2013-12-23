define([
  'backbone',
  'views/menu',
  'models/player',
], function (Backbone, Menu, Player) {
  return Backbone.Model.extend({
    initialize: function (options) {
      this.menu = new menu();
    },
  });
});

