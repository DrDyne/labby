define([
  'backbone',
  'views/hud/squares',
  'views/hud/actions',
  'views/hud/chat',
  'templates/index',
], function (Backbone, Squares, Actions, Chat, tpl) {
  return Backbone.View.extend({
    events: {
      'click .minimize-chat': 'minimizeChat',
      'click .maximize-chat': 'maximizeChat',
    },

    initialize: function () {
      this.render();

      this.createComponents();
      this.renderComponents();
    },

    render: function () {
      this.$el.html(tpl.hud.base());
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
