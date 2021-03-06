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
      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      }
    },

    deps: [
      'bootstrap',
      'backbone',
      'underscore',
      'com',
    ]
});

require([
  'backbone',
  'views/app',
  'session',
], function (Backbone, App, Session) {
  Backbone.history.start();
  var app = new App({el:'body'});
  window.app = app;
});
