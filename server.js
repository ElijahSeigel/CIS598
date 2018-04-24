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
		 rooms[room_count].players.push({socket});
		 rooms[room_count].inStill.push({socket});
		 socket.emit('new_room', room_count);
		 room_count++;
	 }) 
	 
  })
  
  socket.on('join_room', (name)=>{
	 rooms.forEach(function(room){
		 if(room.name === name){
			 room.players.push({socket});
			 room.inStill.push(socket);
			 socket.emit('join_room', room.id);
			 return;
		 }
		 socket.emit('join_room', 'failure');
	 }) 
	 
  })
  
  socket.on('start', (id)=>{
	  var d = new Date();
	  var pairs;
	  rooms[id].players.forEach(function(player){
		player.push(""+math.floor(Math.random()*Math.floor(10))+" "+math.floor(Math.random()*Math.floor(10))+" "+math.floor(Math.random()*Math.floor(10))+" "+math.floor(Math.random()*Math.floor(10)));
	  });
	  //adapted from https://stackoverflow.com/questions/21295162/javascript-randomly-pair-items-from-array-without-repeats
	  if(rooms[id].players.length%2 === 0){
		var players1 = Array.from(rooms[id].players.slice(),
		var players2 = Array.from(rooms[id].players);
		
		players1.sort(function() { return 0.5 - Math.random();});
		players2.sort(function() { return 0.5 - Math.random();});
		
		while(players1.length){
			var player1 = players1.pop(),
            player2 = players2[0] == player1 ? players2.pop() : players2.shift();
			
			players1.splice(players1.findIndex(player2),0);
			players2.splice(players2.findIndex(player1),0);
			
			rooms[id].players.forEach(function(player){
				if(player[1] === player1[1]){
					player[2] = player2[1];
				}
				if(player[1] === player2[1]){
					player[2] = player1[1];
				}
			});
		}
	  }
	  
	  rooms[id].players.forEach(function(player){
		 player[0].emit('start', player[1]);
	  });
  })
  
  
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))

