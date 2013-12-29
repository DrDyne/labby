define([
  'backbone',
  'http://localhost:9001/socket.io/socket.io.js'
], function (Backbone, io) {
  var com = _.clone(Backbone.Events);
  com.ws = window.io.connect('http://localhost:9001');
  return com;
});
