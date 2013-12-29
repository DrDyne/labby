define([
  'backbone',
  'com',
  'session',
  'collections/actions',
  'templates/index',
], function (Backbone, com, session, Actions, tpl) {
  return Backbone.View.extend({
    events: {
      'click .action': 'execute',
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

    execute: function (event) {
      event.preventDefault();
      var action = event.currentTarget.getAttribute('data-action');
      console.log(action, this.collection.get(action));

      if ( !session.isMyTurn() ) return;

      com.trigger('action:' + action);
    },

    render: function () {
      this.$el.html(tpl.hudActions());
    },

  });
});
