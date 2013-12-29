define([
  'backbone',
], function (Backbone) {
  var actions = {};

  actions.Move = Backbone.extend({
    id: 'move',
    label: 'Move',
  });

  actions.Push = Backbone.extend({
    id: 'push',
    label: 'Push',
  });

  actions.Use = Backbone.extend({
    id: 'use',
    label: 'Use',
  });

  return actions;
});
