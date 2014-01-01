define([
  'backbone',
  'com',
  'collections/map',
  'templates/index',
], function (Backbone, com, Squares, tpl) {
  return Backbone.View.extend({
    events: {
      'click .hud-square': 'select',
      'click .rotate': 'rotate',
    },

    initialize: function (options) {
      this.collection = new Squares();
      this.listenTo(com, 'player:add:square', this.add, this);
      this.listenTo(com, 'action:cancel', this.cancel, this);
      this.listenTo(this.collection, 'all', this.update, this);
    },

    add: function (square) {
      this.collection.add(square);
    },

    remove: function (square) {
      console.log('remove square', square);
    },

    select: function (event) {
      event.preventDefault();
      var index = event.currentTarget.getAttribute('data-hud-square-index');
      this.collection.select(index);
      this.update();
    },

    rotate: function (event) {
      event.preventDefault();
      var square = this.collection.getSelected();
      if ( !square ) return;
      var direction = event.currentTarget.getAttribute('data-rotate-direction');
      square.rotate(direction);
    },

    cancel: function () {
    },

    render: function () {
      this.$el.html(tpl.hud.squares());
    },

    update: function () {
      var self = this;
      this.collection.each(function (model, index) {
        var el = self.$el.find('[data-hud-square-index="' + index + '"]');
        el.html(tpl.map.square(model.toJSON()));
      });
    },
  });
});
