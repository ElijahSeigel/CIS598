//game.js

import scoketIOClient from 'socket.io-client';

//game state scripts
import Entrance from './stateScripts/Entrance';
import Join from './stateScripts/Join';
import Create from './stateScripts/Create';
import Wait from './stateScripts/Wait';
import WaitStart from './stateScripts/WaitStart';
import SongPlaying from './stateScripts/SongPlaying';
import Out from './stateScripts/Out';
import Vote from './stateScripts/Vote';
import Loss from './stateScripts/Loss';
import A from './stateScripts/A';
import B from './stateScripts/B';
import Winner from './stateScripts/Winner';

//central game control class
export default class Game{
	constructor(){
		//keeps track of which state the client is in, defined in the use case realization
		this.state = 0;
		
		//communication endpoint
		this.socket = socketIOClient("http://129.130.18.116:5000")
		
		//the room ID server side
		this.roomID;
		
		//start time of the most recent round
		this.roundStart;
		
		//whether this client owns the game room
		this.ownerFlag = false;
		
		//x and y coordinates of click, default -1
		this.x = -1;
		this.y = -1;
		
		//state variables
		this.entrance = new Entrance();
		this.join = new Join();
		this.create = new Create();
		this.wait = new Wait();
		this.waitStart = new WaitStart();
		this.songPlaying = new SongPlaying();
		this.out = new Out();
		this.vote = new Vote();
		this.loss = new Loss();
		this.a = new A();
		this.b = new B();
		this.winner = new Winner();
		
		//Create the canvas
		this.canvas = document.getElementById('canvas');
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.canvas.style.width = window.innerWidth + "px";
		this.canvas.style.height = window.innerHeight + "px";
		this.context = this.canvas.getContext('2d');
		
		//create input field
		this.input = document.getElementById('text');
		this.input.hidden = true;
		
		//Bind class functions
		this.handleInput = this.handleInput.bind(this);
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.loop = this.loop.bind(this);
		
		//set up event handlers
		document.getElementById('canvas').addEventListener("click", this.handleInput);
		
		//initial render
		this.render();
		
		// Start the game loop
		this.interval = setInterval(this.loop, 10);
	}//end constructor
	
	handleInput(event){
		this.X = event.clientX;
		this.Y = event.clientY;
	}//end handleInput
	
	update(){
		switch(this.state){
			case 0:
				this.state = this.entrance.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				if(this.state === 2){this.ownerFlag = true};
				break;
			case 1:
				var result = this.create.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.input, this.socket);
				this.state = result[0];
				if(this.state === 3){
					this.roomID = result[1];
				}
				break;
			case 2:
				var result = this.create.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.input, this.socket);
				this.state = result[0];
				if(this.state === 4){
					this.roomID = result[1];
				}
				break;
			case 3:
				var result = this.waitStart.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.socket);
				this.state = result[0];
				if(this.state === 5){
					this.roundStart = result[1];
				}
			case 4:
				var result = this.waitStart.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.socket, this.roomID);
				this.state = result[0];
				if(this.state === 5){
					this.roundStart = result[1];
				}
				break;
			case 5:
				this.state = this.songPlaying.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 6:
				this.state = this.out.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 7:
				this.state = this.vote.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 8:
				this.state = this.loss.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.ownerFlag);
				break;
			case 9:
				this.state = this.a.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 10:
				this.state = this.b.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 11:
				this.state = this.winner.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.ownerFlag);
				break;
		}//end switch(state)
		this.X = -1;
		this.Y = -1;
	}//end update
	
	render(){
		switch(this.state){
			case 0:
				this.entrance.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height);
				break;
			case 1:
				this.join.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height, this.input);
				break;
			case 2:
				this.create.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height, this.input);
				break;
			case 3:
				this.wait.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height, this.input);
				break;
			case 4:
				this.waitStart.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height, this.input);
				break;
			case 5:
				this.songPlaying.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height);
				break;
			case 6:
				this.out.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height);
				break;
			case 7:
				this.vote.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height);
				break;
			case 8:
				this.loss.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height);
				break;
			case 9:
				this.a.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height);
				break;
			case 10:
				this.b.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height);
				break;
			case 11:
				this.winner.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height);
				break;
		}//end switch(state)
	}//end render
	
	loop() {
	  this.update();
      this.render();
	}//end loop
	
}

//start the client code
new Game();

