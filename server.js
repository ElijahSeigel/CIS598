// Dependencies
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 5000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
var io = socketIO(server);

//server varaibles
var rooms = [];
var room_count = 0;
var songs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];


//web socket handlers
io.on('connection', (socket)=>{
  console.log('User connected')

  socket.on('new_room', (name)=>{
	  console.log('new_room')
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
							inStill: [],
							votesA: 0,
							votesB: 0
							};
		socket.emit('new_room', room_count);
		room_count++;
	}
  })
  
  socket.on('join_room', (name)=>{
	flag = true;
	 rooms.forEach(function(room){
		 if(room.name === name){
			 flag = false;
			if(room.players.length >= 30){
				socket.emit('join_room', 'Room Full'); 
			 }
			 else{
				 room.players.push([socket]);
				 console.log("join: "+ name)
				 socket.emit('join_room', room.id);
			 }
		 }
	 })
	if(flag){
		console.log("fail to join "+ name);
		socket.emit('join_room', 'No Room');
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
	  var tempSongs = songs.slice();
	
	  players1.sort(function() { return 0.5 - Math.random();});
	  players2.sort(function() { return 0.5 - Math.random();});
	  tempSongs.sort(function() { return 0.5 - Math.random();});
	
	  while(players1.length){
		var player1 = players1.pop(),
		player2 = players2[0] == player1 ? players2.pop() : players2.shift();
		
		players1.splice(players1.indexOf(player2),1);
		players2.splice(players2.indexOf(player1),1);
		song = tempSongs.pop();
		
		rooms[id].inStill.forEach(function(player){
			if(player[1] === player1[1]){
				player[2] = player2[1];
				player[3] = song;
				console.log(player[1]+" : "+player[2]);
				console.log(song);
			}
			if(player[1] === player2[1]){
				player[2] = player1[1];
				player[3] = song;
			}
		});
		console.log();
	  }
	  if(oddFlag){
		  odd[3] = tempSongs.pop();
		  rooms[id].inStill.push(odd);
	  }
	  rooms[id].inStill.forEach(function(player){
		 player[0].emit('start', [player[1], player[3]]);
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
						  player2[2] = "-1"
					  }
				  })
				player1[2] = "-1"  
			  }//end guess correct
			  else{
				  if(guess === '0 0 0 0'){
					var flag = false;
					rooms[id].inStill.forEach(function(player2){
						if(player1[2] === player2[1]){
							flag = true;
						}
					})
					if(flag){
						rooms[id].inStill.splice( rooms[id].inStill.indexOf(player1), 1);
						console.log("guess not correct");
				        socket.emit('guess', 'failure');
					}else{
						console.log("guess correct");
						socket.emit('guess', 'success');
					}
				  }
				  else{
				   rooms[id].inStill.splice( rooms[id].inStill.indexOf(player1), 1);
				   console.log("guess not correct");
				   socket.emit('guess', 'failure');
				   rooms[id].inStill.forEach(function(player2){
					  if (guess === player2[1]){
						  rooms[id].inStill.splice( rooms[id].inStill.indexOf(player2), 1);
						  player2[0].emit('guess', 'failure');
					  }
				  })
				 }
				}
		  }//end if guesser
	  });
  })
  
 socket.on('reset', (id)=>{
	 console.log("reset attempt");
	 if(!rooms[id].resetFlag){
		rooms[id].resetFlag = true;
		console.log("reset success");
		rooms[id].inStill.forEach(function(player1){
			rooms[id].inStill.forEach(function(player2){
				if(player1[2] === player2[1]){
					player1[0].emit('guess', 'failure');
					rooms[id].inStill.splice( rooms[id].inStill.indexOf(player1), 1);
					player2[0].emit('guess', 'failure');
					rooms[id].inStill.splice( rooms[id].inStill.indexOf(player2), 1);
				}
			})
		}) 
		 
		var odd;
		var oddFlag = false;
		if(rooms[id].inStill.length === 0){
			rooms[id].players.forEach(function(player){
				player[0].emit('advanceL', 0);
			})
		}else if(rooms[id].inStill.length === 1){
			rooms[id].players.forEach(function(player){
				player[0].emit('advanceL', 1);
				player[0].emit('advanceW', [1,""]);
			})
		}
		else if(rooms[id].inStill.length === 2){
		rooms[id].inStill[0][0].emit('advanceW', [2, Math.floor(Math.random()*Math.floor(30))]);
			rooms[id].inStill[1][0].emit('advanceW', [3,Math.floor(Math.random()*Math.floor(30))]);
			rooms[id].players.forEach(function(player){
				if(player[0] !== rooms[id].inStill[0][0] || player[0] !== rooms[id].inStill[1][0]){
					player[0].emit('advanceL', 4);
				}
			})
		}
		else{
			if(rooms[id].inStill.length%2 === 1){
			odd = rooms[id].inStill.pop();
			odd[2] =("0 0 0 0");
			oddFlag = true;
			}
			var players1 = rooms[id].inStill.slice();
			var players2 = rooms[id].inStill.slice();
			var tempSongs = songs.slice();

			players1.sort(function() { return 0.5 - Math.random();});
			players2.sort(function() { return 0.5 - Math.random();});
			tempSongs.sort(function() { return 0.5 - Math.random();});
			

			while(players1.length){
				var player1 = players1.pop(),
				player2 = players2[0] == player1 ? players2.pop() : players2.shift();

				players1.splice(players1.indexOf(player2),1);
				players2.splice(players2.indexOf(player1),1);
				song = tempSongs.pop();

				rooms[id].inStill.forEach(function(player){
					if(player[1] === player1[1]){
						player[2] = player2[1];
						player[3] = song;
						console.log(player[1]+" : "+player[2]);
						console.log(song);
					}
					if(player[1] === player2[1]){
						player[2] = player1[1];
						player[3] = song;
					}
				});
				console.log();
			}
			if(oddFlag){
			  odd[3] = tempSongs.pop();
			  rooms[id].inStill.push(odd);
			}
			rooms[id].inStill.forEach(function(player){
				player[0].emit('advanceW', [5, player[3]]);
			});
		}
	 }
 })
 
 socket.on('vote', (input)=>{
	  var id = input[0];
	  var vote = input[1];
	  
	  if(vote === 'A'){
		rooms[id].votesA++;  
	  }
	  else{
		 rooms[id].votesB++; 
	  }
	  if(rooms[id].votesA + rooms[id].votesB === rooms[id].players.length - 2){
		  if(rooms[id].votesA > rooms[id].votesB){
			  rooms[id].inStill[0][0].emit('win');
			  rooms[id].inStill[1][0].emit('loss');
		  }
		  else if(rooms[id].votesB > rooms[id].votesA)
		  {
			rooms[id].inStill[1][0].emit('win');
			rooms[id].inStill[0][0].emit('loss'); 
		  }
		  else{
			rooms[id].inStill[0][0].emit('win');
			rooms[id].inStill[1][0].emit('win');  
		  }
	  }
 })
  
  socket.on('restart', (id)=>{
	  rooms[id].votesA = 0;
	  rooms[id].votesB = 0;
	  rooms[id].resetFlag = false;
	  var odd;
	  var oddFlag = false;
	  rooms[id].players.forEach(function(player){
		player[1]=(""+(Math.floor(Math.random()*Math.floor(9))+1)+" "+Math.floor(Math.random()*Math.floor(10))+" "+Math.floor(Math.random()*Math.floor(10))+" "+Math.floor(Math.random()*Math.floor(10)));
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
	  var tempSongs = songs.slice();	  
	
	  players1.sort(function() { return 0.5 - Math.random();});
	  players2.sort(function() { return 0.5 - Math.random();});
	  tempSongs.sort(function() { return 0.5 - Math.random();});
	
	  while(players1.length){
		var player1 = players1.pop(),
		player2 = players2[0] == player1 ? players2.pop() : players2.shift();
		
		players1.splice(players1.indexOf(player2),1);
		players2.splice(players2.indexOf(player1),1);
		song = tempSongs.pop();
		
		rooms[id].inStill.forEach(function(player){
			if(player[1] === player1[1]){
				player[2] = player2[1];
				player[3] = song;
				console.log(player[1]+" : "+player[2]);
				console.log(song);
			}
			if(player[1] === player2[1]){
				player[2] = player1[1];
				player[3] = song;
			}
		});
		console.log();
	  }
	  if(oddFlag){
		  odd[3] = tempSongs.pop();
		  rooms[id].inStill.push(odd);
	  }
	  rooms[id].inStill.forEach(function(player){
		 player[0].emit('restart', [player[1], player[3]]);
	  });
  })
  
  
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
	rooms.forEach(function(room){
	if(room.players[0][0] === socket){
		room.name = "";
		room.id = -1;
	}
	})	
  })
})

//server.listen(process.env.PORT || 5000, () => console.log(`Listening on port ${port}`))

