define([
  'backbone',
  'com',
  'session',
  'collections/actions',
  'templates/index',
], function (Backbone, com, session, Actions, tpl) {
  return Backbone.View.extend({
    events: {
      'click .action': 'triggerAction',
    },

    initialize: function (options) {
      this.collection = new Actions();
      this.initActions();
    },

    initActions: function () {
      this.addAction('use');
      this.addAction('push');
      this.addAction('move');
    },

    addAction: function (id) {
      this.collection.add({id:id});
    },

    triggerAction: function (event) {
      event.preventDefault();
      this.cancel();
      var action = event.currentTarget.getAttribute('data-action');
      this.execute(action);
    },

    cancel: function (event) {
      com.trigger('action:cancel');
    },

    execute: function (action) {
      console.log(action, this.collection.get(action));
      if ( !session.isMyTurn() ) return;
      com.trigger('action:' + action);
    },

    render: function () {
      this.$el.html(tpl.hud.actions());
    },

  });
});
