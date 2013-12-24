define([
  'http://localhost:9001/socket.io/socket.io.js'
], function (io) {
  var io = window.io;
  var socket = io.connect('http://localhost:9001');
  console.log('soukadidiair', socket);

  socket.on('players', function (data) {
    console.log('connected players:', data);
  });

  return socket;
});
