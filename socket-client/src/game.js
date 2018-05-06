//game.js

import socketIOClient from 'socket.io-client';

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
		this.socket = socketIOClient("https://silent-dance-off.herokuapp.com");
		//the room ID server side
		this.roomID;
		
		//timer for the current round
		this.roundTimer = 0;
		
		//the code assigned at start of game
		this.code
		
		//song to be played, 0 is no song
		this.song = 0;
		
		//whether this client owns the game room
		this.ownerFlag = false;
		
		//whether or not this is the first round of a restarted game
		this.restartFlag = false;
		
		//x and y coordinates of click, default -1
		this.x = -1;
		this.y = -1;
		
		//state variables
		this.entrance = new Entrance();
		this.join = new Join(this.socket);
		this.create = new Create(this.socket);
		this.wait = new Wait(this.socket);
		this.waitStart = new WaitStart(this.socket);
		this.songPlaying = new SongPlaying(this.socket);
		this.out = new Out(this.socket);
		this.vote = new Vote();
		this.loss = new Loss(this.socket);
		this.a = new A(this.socket);
		this.b = new B(this.socket);
		this.winner = new Winner(this.socket);
		
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
		this.preventMotion = this.preventMotion.bind(this);
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.loop = this.loop.bind(this);
		
		//set up event handlers
		document.getElementById('canvas').addEventListener("click", this.handleInput);
		//window.addEventListener("scroll", this.preventMotion, false);
		//window.addEventListener("touchmove", this.preventMotion, false);
		//initial render
		this.render();
		
		// Start the game loop
		this.interval = setInterval(this.loop, 10);
	}//end constructor
	
	handleInput(event){
		this.X = event.clientX;
		this.Y = event.clientY;
		
	}//end handleInput
	
	preventMotion(event)
	{
		window.scrollTo(0, 0);
		event.preventDefault();
		event.stopPropagation();
	}
	
	update(){
		switch(this.state){
			case 0:
				this.state = this.entrance.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				if(this.state === 2){this.ownerFlag = true};
				break;
			case 1:
				var result = this.join.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.input, this.socket);
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
				var result = this.wait.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.socket);
				this.state = result[0];
				if(this.state === 5){
					this.roundTimer = 18000;
					this.code = result[1];
					this.song = result[2];
					//console.log('youtube-audio-'+result[2]);
					document.getElementById('youtube-audio-'+result[2]).click();
				}
				break;
			case 4:
				var result = this.waitStart.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.socket, this.roomID);
				this.state = result[0];
				if(this.state === 5){
					this.roundTimer = 18000;
					this.code = result[1];
					this.song = result[2];
					//console.log('youtube-audio-'+result[2]);
					document.getElementById('youtube-audio-'+result[2]).click();
				}
				break;
			case 5:
				var result = this.songPlaying.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.socket, this.roomID, this.roundTimer, this.restartFlag);
				this.state = result[0];
				this.restartFlag = false;
				if((this.state === 5 || this.state === 9 || this.state === 10)&& result[1] === 1 ){
					this.roundTimer = 18000;
					document.getElementById('youtube-audio-'+this.song).click();
					this.song = result[2];
					document.getElementById('youtube-audio-'+result[2]).click();
				}
				break;
			case 6:
				this.state = this.out.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 7:
				this.state = this.vote.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.socket, this.roomID);
				break;
			case 8:
				var result = this.loss.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.ownerFlag, this.socket, this.roomID);
				this.state = result[0];
				this.restartFlag = true;
				if(this.state === 5){
					this.roundTimer = 18000;
					this.code = result[1];
					this.song = result[2];
					document.getElementById('youtube-audio-'+result[2]).click();
				}
				break;
			case 9:
				this.state = this.a.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 10:
				this.state = this.b.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 11:
				var result = this.winner.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.ownerFlag, this.socket, this.roomID);
				this.state = result[0];
				this.restartFlag = true;
				if(this.state === 5){
					this.roundTimer = 18000;
					this.code = result[1];
					this.song = result[2];
					document.getElementById('youtube-audio-'+result[2]).click();
				}
				break;
		}//end switch(state)
		this.X = -1;
		this.Y = -1;
		if(this.roundTimer>0){
			this.roundTimer--;
		}
		if(this.state !== 5 && this.state !== 9 && this.state !== 10 && this.song!==0){
			document.getElementById('youtube-audio-'+this.song).click();
			this.song=0;
		}
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
				this.songPlaying.render(this.context, this.ownerFlag, this.canvas.width, this.canvas.height, this.code, this.roundTimer);
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

