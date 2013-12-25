define([
  'backbone'
], function (Backbone) {
  return Backbone.View.extend({
    initialize: function (options) { },

    start: function () {
      console.log('splash !!!');
      var self = this;
      setTimeout(function () { //ry fake timer to emulate splash screen
        self.trigger('splash:end');
      }, 500);
    }
  });
});

