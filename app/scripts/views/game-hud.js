define([
  'backbone',
  'templates/index',
], function (Backbone, tpl) {
  return Backbone.View.extend({
    initialize: function (options) {
    },
    render: function () {
      this.$el.html(tpl.hud());
    }
  });
});
