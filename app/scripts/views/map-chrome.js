define([
  'backbone',
  'com',
  'session',
  'templates/index',
], function (Backbone, com, session, tpl) {
  return Backbone.View.extend({
    events: {
      'click .chrome': 'onClickCandidate',
    },

    initialize: function (options) {
      this.listenTo(com, 'action:cancel', this.cancel, this);
      this.listenTo(com, 'action:push', this.showPushCandidates, this);
    },

    onClickCandidate: function (event) {
      event.preventDefault();
      var options = {
        player: session.get('player'),
        row: event.currentTarget.getAttribute('data-pos-y'),
        col: event.currentTarget.getAttribute('data-pos-x'),
      };

      if ( options.player.get('squares').getSelected() )
        com.trigger('player:push', options);
    },

    findChrome: function (options) {
      return this.$el.find('.chrome[data-pos-y="' + options.y + '"][data-pos-x="' + options.x + '"]');
    },

    update: function () { //TODO ry play with easing and jquery animations
      _(this.collection.cols()).each(function (col, index) {
        this.findChrome({x: index, y: 'bottom'})[ this.isPushable('up', index) ? 'removeClass' : 'addClass' ]('chrome-hidden');
        this.findChrome({x: index, y: 'top'})[ this.isPushable('down', index) ? 'removeClass' : 'addClass' ]('chrome-hidden');
        //console.log(index, 'up', this.isPushable('up', index), 'down', this.isPushable('down', index));
      }, this);

      _(this.collection.rows()).each(function (row, index) {
        this.findChrome({x: 'right', y: index})[ this.isPushable('left', index) ? 'removeClass' : 'addClass' ]('chrome-hidden');
        this.findChrome({x: 'left', y: index})[ this.isPushable('right', index) ? 'removeClass' : 'addClass' ]('chrome-hidden');
        //console.log(index, 'left', this.isPushable('left', index), 'right', this.isPushable('right', index));
      }, this);
    },

    //ry direction = up right down left
    // coord = X or Y (int)
    isPushable: function (direction, coord) {
      var blocked = false;

      if ( direction === 'up' || direction === 'down' ) {
        var x = coord;
        if ( direction === 'up' && this.collection.hasPlayer(x, 0) )
          return false;
        if ( direction === 'down' && this.collection.hasPlayer(x, this.collection.getHeight()) )
          return false;

        for ( var y = 0; y < this.collection.getHeight(); y++ ) {
          if ( this.collection.isBlocker(x, y) ) blocked = true;
        }
        return !blocked;
      }

      if ( direction === 'right' || direction === 'left' ) {
        var y = coord;
        if ( direction === 'right' && this.collection.hasPlayer(this.collection.getWidth(), y) )
          return false;
        if ( direction === 'left' && this.collection.hasPlayer(0, y) )
          return false;
        for ( var x = 0; x < this.collection.getWidth(); x++ ) {
          if ( this.collection.isBlocker(x, y) ) blocked = true;
        }
        return !blocked;
      }
    },

    findSquare: function (options) {
      return this.$el.find('.square[data-pos-x="' + options.x + '"][data-pos-y="' + options.y + '"]');
    },

  //options.y = top | bottom
    renderRowChrome: function (options) {
      var $el = $(tpl.map.row({index:undefined}));

      this.renderSquareChrome($el, {y: options.y, x: 'left', hidden: true});

      for ( var i=0; i < this.collection.width; i++ ) {
        this.renderSquareChrome($el, {x:i, y: options.y});
      }

      this.renderSquareChrome($el, {y: options.y, x: 'right', y: options.y, x: 'right', hidden: true});

      if ( options.append )
        this.$el.find('.map-surface').append($el);
      if ( options.prepend )
        this.$el.find('.map-surface').prepend($el);
    },

    renderSquareChrome: function ($el, options) {
      if ( !options ) options = {};
      if ( !options.append && !options.prepend ) options.append = true;
      var json = {
        cls: {},
        player: undefined,
        x: options.x,
        y: options.y,
        allows: {},
      };

      json.cls.chrome = 'chrome';
      if ( options.hidden ) json.cls.hidden = 'chrome-hidden';

      if ( options.append )
        $el.append(tpl.map.chrome(json));
      if ( options.prepend )
        $el.prepend(tpl.map.chrome(json));
    },

    renderTop: function () {
      this.renderRowChrome({prepend: true, y:'top'});
    },

    renderSides: function () {
      _(this.collection.rows()).each(function (row, index) {
        var square, $el = this.$el.find('.map-row[data-row-index="' + index + '"]');

        square = _(row).first();
        this.renderSquareChrome($el, {x:'left', y: square.get('y'), prepend: true});

        square = _(row).last();
        this.renderSquareChrome($el, {x:'right', y: square.get('y'), append: true});
      }, this);
    },

    renderBottom: function () {
      this.renderRowChrome({append: true, y:'bottom'});
    },

    render: function (options) {
      this.renderTop();
      this.renderSides();
      this.renderBottom();

      if ( options.hidden ) this.hidePushCandidates();
      return this;
    },

    hidePushCandidates: function () {
      this.$el.find('.chrome').addClass('chrome-hidden');
    },

    showPushCandidates: function () {
      this.update();
    },

    cancel: function () {
      this.hidePushCandidates();
    },
  });
});
