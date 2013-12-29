//ry this map view will instanciate a collection of squares
define([
  'backbone',
  'collections/map',
  'views/map-chrome',
  'views/map-players',
  'templates/index',
], function (Backbone, Map, Chrome, Players, tpl) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.collection = new Map();
      this.collection.loadLayout(options.layout);
      this.players = new Players({el: options.el, collection: this.collection, model: this.model.getPlayers()});
      this.chrome = new Chrome({el: options.el, collection: this.collection})
    },

    render: function () {
      var surface = this.$el.find('.map-surface');

      surface.html('');

      _(this.collection.rows()).each(function (row, index) {
        row.index = index;
        var mapRow = $(tpl.mapRow(row));
        _(row).each(function (square) { mapRow.append(tpl.mapSquare(square.toJSON())) });
        surface.append(mapRow);
      });

      this.chrome.render();
      this.chrome.update();

      return this;
    },

  });
});
