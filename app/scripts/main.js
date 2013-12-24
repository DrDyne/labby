/*global require*/
'use strict';

require.config({
    paths: {
      jquery: '../bower_components/jquery/jquery.min',
      backbone: '../bower_components/backbone/backbone-min',
      underscore: '../bower_components/underscore/underscore-min',
      bootstrap: 'vendor/bootstrap',
      text: 'vendor/text',

      templates: '../templates',
    },
    shim: {
      underscore: { exports: '_' },
      backbone: {
        deps: [ 'underscore', 'jquery' ],
        exports: 'Backbone'
      },
      'backbone.io': ['backbone'],
      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      }
    },
});

require([
  'backbone',
  'views/game',
], function (Backbone, Game) {
  Backbone.history.start();
  var game = new Game({el:'body'});
});
