var _ = require('underscore');
var app = require('http').createServer();
var io = require('socket.io').listen(app);

var GAME = {
  status: 'waiting', // waiting | playing
  players: [], // player names
  stage: undefined, // stage name
  max: 2, // max nb of players
  turn: {
    actions: ['move', 'use', 'push'],
    player: undefined,
  },
};

var rooms = {
  lobby: [],
};

io.sockets.on('connection', function (socket) {

  socket.on('game:init', function (client) {
    socket.emit('players', rooms.lobby);
  });

  socket.on('game:start', function (options) {
    console.log(options);
  });

  socket.on('player:create', function (playerName) {
    rooms.lobby.push(playerName);
    socket.set('playerName', playerName);
    socket.join('lobby');
    io.sockets.in('lobby').emit('players', rooms.lobby);
    console.log(_(rooms).keys());
  });

  socket.on('game:host', function (options) {
    socket.emit('game:create', options);
    console.log('game hosted', options);
  });

  socket.on('game:created', function (options) {
    rooms[options.name] = options;
    console.log('game created', options);
  });

  socket.on('game:join', function (options) { 
    console.log('join game:', options);
  });

});

app.listen(9001);

//ry socket.io cheatsheet !!!

//##choosing who to send messages to
//  // send to current request socket client
//  socket.emit('message', "this is a test");
//
//  // sending to all clients, include sender
//  io.sockets.emit('message', "this is a test");
//
//  // sending to all clients except sender
//  socket.broadcast.emit('message', "this is a test");
//
//  // sending to all clients in 'game' room(channel) except sender
//  socket.broadcast.to('game').emit('message', 'nice game');
//
//  // sending to all clients in 'game' room(channel), include sender
//  io.sockets.in('game').emit('message', 'cool game');
//
//  // sending to individual socketid
//  io.sockets.socket(socketid).emit('message', 'for your eyes only');

//##joining and leaving rooms
//  Joining a named room is achieved by calling the join() function on a connected socket object.
//  socket.join('room')
//
//  Leaving a room is achieved by calling the leave() function on a connected socket object.
//  socket.leave('room')
//
//  A simple subscribe/unsubscribe system can be built very quickly.
//  socket.on('subscribe', function(data) { socket.join(data.room); })
//  socket.on('unsubscribe', function(data) { socket.leave(data.room); })
//
//  Note that it is not necessary to call socket.leave() during the disconnect event. This will happen automatically. Empty rooms will be automatically pruned so there is no need to manually remove them.
