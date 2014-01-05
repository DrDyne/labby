//ry this map view will instanciate a collection of squares
define([
  'backbone',
  'collections/map',
  'views/map-chrome',
  'views/map-players',
  'views/animations',
  'templates/index',
], function (Backbone, Map, Chrome, Players, AnimationQueue, tpl) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.collection = new Map();
      this.collection.loadLayout(options.layout);
      this.players = new Players({el: options.el, collection: this.collection, model: this.model.getPlayers()});
      this.chrome = new Chrome({el: options.el, collection: this.collection})

      this.fx = new AnimationQueue();

      this.render();

      this.listenTo(this.collection, 'add', this.animateAdd, this);
      this.listenTo(this.collection, 'push:row', this.animatePushRow, this);
      this.listenTo(this.collection, 'push:col', this.animatePushCol, this);
      this.listenTo(this.collection, 'remove', this.animateRemove, this);
    },

    squareWidth: 50,

    mapStyle: function (element) { return  (this.collection.width * this.squareWidth) + 'px' },

    $chrome: function () { return this.$el.find('.map-chrome') },
    $surface: function () { return this.$el.find('.map-surface') },

    render: function () {
      var self = this, $surface = this.$surface();

      this.$chrome().css({
        width: this.mapStyle(),
        height: this.mapStyle(),
        'margin-top': '-' + this.mapStyle(),
      });

      $surface.css({
        width: this.mapStyle(),
        height: this.mapStyle(),
      });

      $surface.html('');

      _(this.collection.rows()).each(function (row, index) {
        row.index = index;
        _(row).each(function (square) {
          $surface.append(tpl.map.square(square.toJSON()));
        });
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

    animateAdd: function (square) {
      var $surface = this.$surface();
      this.fx.add(function (next) {
        var el = tpl.map.square(square.toJSON());
        $surface.append(el).queue(next);
      });
    },

    animatePushRow: function (options) {
      var self = this;
      this.fx.add(function (next) {
        if ( options.direction === 'left' )
          $('.square:not(.chrome)[data-pos-x="right"]').attr('data-pos-x', self.collection.width);
        var $row = _(options.row).map(function (item) {
          return '[data-pos-y="' + item.get('y') + '"]:not(.chrome)'
        }).join(', ');

        $($row).animate({left: (options.direction === 'right' ? '+' : '-' ) + "=50"}).queue(next);
      });
    },

    animatePushCol: function (options ) {
      var self = this;
      this.fx.add(function (next) {
        if ( options.direction === 'up' )
          $('.square:not(.chrome)[data-pos-y="bottom"]').attr('data-pos-y', self.collection.height);

        var $col = _(options.col).map(function (item) {
          return '[data-pos-x="' + item.get('x') + '"]:not(.chrome)'
        }).join(', ');

        $($col).animate({top: (options.direction === 'down' ? '+' : '-' ) + "=50"}).queue(next)
      });
    },

    animateRemove: function (options ) {
      var self = this;
      this.fx.add(function (next) {
        setTimeout(function () {
          console.log('remove', options);
          self.render();
          next();
        }, 1000);
      });
    }, 
  });
});
