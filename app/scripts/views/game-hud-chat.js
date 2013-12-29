define([
  'backbone',
  'templates/index',
], function (Backbone, tpl) {
  return Backbone.View.extend({
    render: function () {
      this.$el.html(tpl.hudChat());
    }
  });
});
