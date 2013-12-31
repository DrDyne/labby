define([
  'backbone',
  'http://localhost:9001/socket.io/socket.io.js'
], function (Backbone, io) {
  var com = _.clone(Backbone.Events);
  var ws = window.io.connect('http://localhost:9001');

  com.on('app:init', function (options) { ws.emit('app:init', options) });
  com.on('player:create', function (options) { ws.emit('player:create', options) });
  com.on('lobby:games', function (options) { ws.emit('lobby:games', options) });
  com.on('game:join', function (options) { ws.emit('game:join', options) });

  com.on('game:created', function (options) { ws.emit('game:created', options) });

  ws.on('player:moved', function (options) { com.trigger('player:moved', options) });
  ws.on('player:connected', function (options) { console.log('connected players:', options); com.trigger('player:connected', options) });
  ws.on('lobby:games:existing', function (options) {
    com.trigger('lobby:games:existing', options);
  });

  return com;
});
