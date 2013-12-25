define(['backbone', 'com'], function (Backbone, com) {
  var Session = Backbone.Model.extend({
    defaults: {
      player: undefined,
      game: undefined,
    }
  });

  return new Session();
});
