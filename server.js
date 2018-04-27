// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var port = 5000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var rooms = [];
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
	 flag = true;
	 rooms.forEach(function(room){
		 if(room.name === name){
			 console.log("failure making new room");
			 flag = false;
			 socket.emit('new_room', 'failure');
		 }
	 })
	if(flag){
		console.log("create: "+name);
		rooms[room_count] = {name: name,
							id: room_count,
							resetFlag: false,
							players: [[socket]],
							inStill: []
							};
		socket.emit('new_room', room_count);
		room_count++;
	}
  })
  
  socket.on('join_room', (name)=>{
	flag = true;
	 rooms.forEach(function(room){
		 if(room.name === name){
			 room.players.push([socket]);
			 console.log("join: "+ name)
			 socket.emit('join_room', room.id);
			 flag = false;
		 }
	 })
	if(flag){
		console.log("fail to join "+ name);
		socket.emit('join_room', 'failure');
	}
	 
  })
  
  socket.on('start', (id)=>{
	  var odd;
	  var oddFlag = false;
	  rooms[id].players.forEach(function(player){
		player.push(""+(Math.floor(Math.random()*Math.floor(9))+1)+" "+Math.floor(Math.random()*Math.floor(10))+" "+Math.floor(Math.random()*Math.floor(10))+" "+Math.floor(Math.random()*Math.floor(10)));
	  });
	  //adapted from https://stackoverflow.com/questions/21295162/javascript-randomly-pair-items-from-array-without-repeats
	  rooms[id].inStill = rooms[id].players.slice()
	  if(rooms[id].inStill.length%2 === 1){
		odd = rooms[id].inStill.pop();
		odd[2] =("0 0 0 0");
		oddFlag = true;
	  }
	  var players1 = rooms[id].inStill.slice();
	  var players2 = rooms[id].inStill.slice();
	
	  players1.sort(function() { return 0.5 - Math.random();});
	  players2.sort(function() { return 0.5 - Math.random();});
	
	  while(players1.length){
		var player1 = players1.pop(),
		player2 = players2[0] == player1 ? players2.pop() : players2.shift();
		
		players1.splice(players1.indexOf(player2),0);
		players2.splice(players2.indexOf(player1),0);
		
		rooms[id].inStill.forEach(function(player){
			if(player[1] === player1[1]){
				player[2] = player2[1];
			}
			if(player[1] === player2[1]){
				player[2] = player1[1];
			}
		});
	  }
	  if(oddFlag){
		  rooms[id].inStill.push(odd);
	  }
	  rooms[id].inStill.forEach(function(player){
		 player[0].emit('start', player[1]);
	  });
  })
  
  socket.on('guess', (input)=>{
	  var id = input[0];
	  var guess = input[1];
	  rooms[id].resetFlag = false;
	  console.log("guess: "+guess)
	  rooms[id].inStill.forEach(function(player1){
		  if(socket === player1[0]){
			  if(guess === player1[2]){
				  console.log("guess correct");
				  socket.emit('guess', 'success');
				  rooms[id].inStill.forEach(function(player2){
					  if (guess === player2[1]){
						  player2[0].emit('guess', 'success');
					  }
				  })
			  }
			  else{
				   rooms[id].inStill.splice( rooms[id].inStill.indexOf(player1), 0);
				   console.log("guess not correct");
				   socket.emit('guess', 'failure');
				   rooms[id].inStill.forEach(function(player2){
					  if (guess === player2[1]){
						  ooms[id].instill.splice( rooms[id].inStill.indexOf(player2), 0);
						  player2[0].emit('guess', 'failure');
					  }
				  })
			  }
		  }
	  });
  })
  
 socket.on('reset', (id)=>{
	 if(!rooms[id].resetFlag){
		rooms[id].resetFlag = true;
		if(rooms[id].inStill.length === 0){
			
		}else if(rooms[id].inStill.length === 1){
			
		}
		else if(rooms[id].inStill.length === 2){
			
		}
		else{
			if(rooms[id].inStill.length%2 === 1){
			odd = rooms[id].inStill.pop();
			odd[2] =("0 0 0 0");
			oddFlag = true;
			}
			var players1 = rooms[id].inStill.slice();
			var players2 = rooms[id].inStill.slice();

			players1.sort(function() { return 0.5 - Math.random();});
			players2.sort(function() { return 0.5 - Math.random();});

			while(players1.length){
			var player1 = players1.pop(),
			player2 = players2[0] == player1 ? players2.pop() : players2.shift();

			players1.splice(players1.indexOf(player2),0);
			players2.splice(players2.indexOf(player1),0);

			rooms[id].inStill.forEach(function(player){
				if(player[1] === player1[1]){
					player[2] = player2[1];
				}
				if(player[1] === player2[1]){
					player[2] = player1[1];
				}
			});
			}
			if(oddFlag){
			  rooms[id].inStill.push(odd);
			} 
		}
	 }
 })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
	
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))

