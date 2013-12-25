define([
  'backbone',
], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      player: undefined,
      game: undefined,
      score: {
        win: 0,
        lost: 0,
      },
    },
  });
});
