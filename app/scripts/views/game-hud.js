define([
  'backbone',
  'views/game-hud-squares',
  'views/game-hud-actions',
  'views/game-hud-chat',
  'templates/index',
], function (Backbone, Squares, Actions, Chat, tpl) {
  return Backbone.View.extend({
    events: {
      'click .minimize-chat': 'minimizeChat',
      'click .maximize-chat': 'maximizeChat',
    },

    render: function () {
      this.$el.html(tpl.hud());

      this.createComponents();
      this.renderComponents();
    },

    createComponents: function () {
      this.squares = new Squares({el: '#hud-squares'});
      this.actions = new Actions({el: '#hud-actions'});
      this.chat = new Chat({el: '#hud-chat'});
    },

    renderComponents: function () {
      this.squares.render();
      this.actions.render();
      this.chat.render();
    },

    minimizeChat: function (event) {
      event.preventDefault();
      console.log('minimize chat');
    },

    maximizeChat: function (event) {
      event.preventDefault();
      console.log('maximize chat');
    },

  });
});
