define([
  'http://localhost:9001/socket.io/socket.io.js'
], function (io) {
  return window.io.connect('http://localhost:9001');
});
