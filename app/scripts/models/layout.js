define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      width: 0,
      height: 0,
      map: [],
    }
  });
});
