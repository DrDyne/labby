define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    attributes: {
      width: 0,
      height: 0,
      map: [],
    }
  });
});
