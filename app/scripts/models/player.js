define(['backbone', 'collections/map'], function (Backbone, Map) {
  return Backbone.Model.extend({
    defaults: {
      id: undefined,
      team: undefined,
      squares: [],
    },

    initialize: function () {
      this.set('squares', new Map());
    },

  });
});
