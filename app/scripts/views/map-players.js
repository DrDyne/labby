//ry each client will have a collection of synchronized players through the server
define([
  'backbone',
  'com',
  'session',
  'templates/index',
], function (Backbone, com, session, tpl) {
  return Backbone.View.extend({
    events: {
      'click .move-candidate': 'onClickCandidate',
    },

    initialize: function (options) {
      this.listenTo(com, 'action:cancel', this.cancel, this);
      this.listenTo(com, 'action:move', this.showMoveCandidates, this);
      this.listenTo(com, 'player:move', this.move, this);
      this.listenTo(com, 'player:moved', this.move, this);
    },

    onClickCandidate: function (event) { 
      event.preventDefault();
      var options = {
        player: session.get('player'),
        direction: event.currentTarget.getAttribute('data-direction'),
      };
      com.trigger('player:move', options);
    },

    move: function (options) {
      var direction = options.direction, player = options.player;
      if ( !player ) player = session.get('player'); // ry we should use id for com instead of bb models
      console.log('moving player!', player, direction);
    },

    canMoveUp: function (square) {
      if ( square.get('y') === 0 ) return false;
      if ( !square.allows('up') ) return false;
      var candidate = this.collection.getSquare(square.get('x'), square.get('y') - 1);
      if ( candidate.isBlocker() ) return false;
      if ( candidate.hasPlayer() ) {
        //ry players of the same team cannot stand in the same square
        //ninjas cannot enter a samurai's square
        //samurais can enter a ninja's square and kill the ninja (except if opp is disguised)
        return false
      }
      return candidate.attributes
    },

    canMoveRight: function (square) {
      if ( square.get('x') === this.collection.getWidth() ) return false;;
      if ( !square.allows('right') ) return false;
      var candidate = this.collection.getSquare(square.get('x') + 1, square.get('y'));
      if ( candidate.isBlocker() ) return false;
      if ( !candidate.allows('left') ) return false;
      if ( candidate.hasPlayer() ) {
        return false;
      }
      return candidate.attributes
    },

    canMoveDown: function (square) {
      if ( square.get('y') === this.collection.getHeight() ) return false;
      var candidate = this.collection.getSquare(square.get('x'), square.get('y') + 1);
      if ( candidate.isBlocker() ) return false;
      if ( !candidate.allows('up') ) return false;
      if ( candidate.hasPlayer() ) {
        return false;
      }
      return candidate.attributes
    },

    canMoveLeft: function (square) {
      if ( square.get('x') === 0 ) return false;
      if ( !square.allows('left') ) return false;
      var candidate = this.collection.getSquare(square.get('x') - 1, square.get('y'));
      if ( candidate.isBlocker() ) return false;
      if ( !candidate.allows('right') ) return false;
      if ( candidate.hasPlayer() ) {
        return false;
      }
      return candidate.attributes
    },

    showMoveCandidates: function () {
      var player = session.get('player');
      var square = this.collection.getPlayerSquare(player);

      var candidates = {
        up: this.canMoveUp(square),
        right: this.canMoveRight(square),
        down: this.canMoveDown(square),
        left: this.canMoveLeft(square),
      };

      console.log(player, 'in', square);
      console.log('can move to', candidates);

      _(['up', 'right', 'down', 'left']).each(function (direction) {
        if ( candidates[direction] ) 
          this.renderCandidate(direction, candidates[direction]);
      }, this);
    },

    hideMoveCandidates: function () {
      this.$el.find('.move-candidate').remove();
    },

    findSquare: function (options) {
      return this.$el.find('.square[data-pos-x="' + options.x + '"][data-pos-y="' + options.y + '"]');
    },

    renderCandidate: function (direction, options) {
      if ( !options ) return;
      console.log('you can move', direction, 'to:', options.x, options.y);
      var square = this.findSquare({x: options.x, y: options.y});
      square.append(tpl.map.moveCandidate({direction: direction}));
    },

    cancel: function () {
      this.hideMoveCandidates();
    },

  });
});
