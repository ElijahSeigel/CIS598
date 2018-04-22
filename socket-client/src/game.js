//game.js

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

export default class Game{
	constructor(){
		//keeps track of which state the client is in, defined in the use case realization
		this.state = 0;
		
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
				if(this.State === 2) this.ownerFlag = true;
				break;
			case 1:
				this.state = this.join.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.input);
				break;
			case 2:
				this.state = this.create.update(this.X, this.Y, this.canvas.width, this.canvas.height, this.input);
				break;
			case 3:
				this.state = this.wait.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break
			case 4:
				this.state = this.waitStart.update(this.X, this.Y, this.canvas.width, this.canvas.height);
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
				this.state = this.loss.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 9:
				this.state = this.a.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 10:
				this.state = this.b.update(this.X, this.Y, this.canvas.width, this.canvas.height);
				break;
			case 11:
				this.state = this.winner.update(this.X, this.Y, this.canvas.width, this.canvas.height);
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

