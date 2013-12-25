define([
  'backbone',
], function (Backbone) {
  return Backbone.Collection.extend({
    model: Backbone.Model.extend({
      defaults: {
        name: undefined,
        team: undefined,
      }
    }),
  });
});
