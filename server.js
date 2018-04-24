// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var port = 5000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var rooms = {};
var room_count = 0;

/*app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html')); 
});
// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});
//web socket handlers
io.on('connection', function (socket){
	
});
//testing connection*
setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);*/

io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('new_room', (name)=>{
	 rooms.forEach(function(room){
		 if(room.name === name){
			 socket.emit('new_room', 'failure');
			 return;
		 }
		 rooms[room_count].name = name;
		 rooms[room_count].id = room_count;
		 rooms[room_count].players.add(socket);
		 rooms[room_count].inStill.add(socket);
		 socket.emit('new_room', room_count);
		 room_count++;
	 }) 
	 
  })
  
  socket.on('join_room', (name)=>{
	 rooms.forEach(function(room){
		 if(room.name === name){
			 room.players.add(socket);
			 room.inStill.add(socket);
			 socket.emit('join_room', room.id);
			 return;
		 }
		 socket.emit('join_room', 'failure');
	 }) 
	 
  })
  
  socket.on('start', (id)=>{
	  var d = new Date();
	  var s = d.getSeconds();
	for(let player of rooms[id].players){
		player.emit('start', s);
	} 
  })
  
  
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))

