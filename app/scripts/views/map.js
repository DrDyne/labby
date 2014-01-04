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

      this.render();

      this.listenTo(this.collection, 'add', this.animateAdd, this);
      this.listenTo(this.collection, 'push:row', this.animatePushRow, this);
      this.listenTo(this.collection, 'push:col', this.animatePushCol, this);
      this.listenTo(this.collection, 'remove', this.animateRemove, this);
    },

    squareWidth: 50,

    mapStyle: function (element) {
      var options = {};
      options.width = options.height = (this.collection.width * this.squareWidth) + 'px';
      return options;
    },

    render: function () {
      var self = this, surface = this.$el.find('.map-surface');

      surface.css(this.mapStyle());

      surface.html('');

      _(this.collection.rows()).each(function (row, index) {
        row.index = index;
        var mapRow = $(tpl.map.row(row));
        _(row).each(function (square) {
          mapRow.append(tpl.map.square(square.toJSON()));
        });
        surface.append(mapRow);
      });

      _(this.collection.rows()).each(function (row, index) {
        _(row).each(function (square) { self.renderWalls(square.pos()) });
      });

      this.chrome.render({hidden: true});

      return this;
    },

    renderWalls: function (pos) {
      //console.log('render walls', pos.x, pos.y);
    },


    // animate push of row/col
    // re-render map
    animateAdd: function (options) {
      console.log('add', options);
    },

    animatePushRow: function (options) {
      console.log('push row', options);
    },

    animatePushCol: function (options ) {
      console.log('push col', options);
    },

    animateRemove: function (options ) {
      console.log('remove', options);
    },

  });
});
