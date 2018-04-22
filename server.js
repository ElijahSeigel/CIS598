// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var port = 5000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
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
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
