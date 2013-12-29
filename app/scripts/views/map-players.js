//ry each client will have a collection of synchronized players through the server
define([
  'backbone',
  'com',
  'session',
], function (Backbone, com, session) {
  return Backbone.View.extend({
    events: {
      'click .move-candidate': 'move',
    },

    initialize: function (options) {
      this.listenTo(com, 'action:move', this.showMoveCandidates.bind(this));
    },

    move: function (event) {
      console.log('moving player!', event.currentTarget.getAttribute('data-target'));
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

    renderCandidate: function (direction, options) {
      if ( !options ) return;
      console.log('you can move', direction, 'to:', options.x, options.y);
    },

  });
});
