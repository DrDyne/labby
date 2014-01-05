define([
  'backbone',
  'com',
  'session',
  'collections/map',
  'templates/index',
], function (Backbone, com, session, Squares, tpl) {
  return Backbone.View.extend({
    events: {
      'click .hud-square': 'onSelect',
      'click .rotate': 'onRotate',
    },

    initialize: function (options) {
      this.collection = session.get('player').get('squares');
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

    onSelect: function (event) {
      event.preventDefault();
      var index = event.currentTarget.getAttribute('data-hud-square-index');
      this.select(index);
    },

    select: function (index) {
      this.collection.select(index);
    },

    onRotate: function (event) {
      event.preventDefault();
      var index = $(event.currentTarget).siblings('.hud-square').attr('data-hud-square-index');
      var direction = event.currentTarget.getAttribute('data-rotate-direction');
      this.select(index);
      this.rotate(index, direction);
    },

    rotate: function (index, direction) {
      var square = this.collection.at(index);
      if ( !square ) return;
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
