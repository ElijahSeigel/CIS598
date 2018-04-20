//game.js

import Entrance from './useCase/entrance';
import Join from './useCase/join';
import create from './useCase/create';
import Wait from './useCase/wait';
import WaitStart from './useCase/waitStart';
import SongPlaying from './useCase/songPlaying';
import Out from './useCase/out';
import Vote from './useCase/vote';
import Loss from './useCase/loss';
import A from './useCase/a';
import B from './useCase/b';
import Winner from './useCase/winner';

class Game{
	constructor(){
		//keeps track of which state the client is in, defined in the use case realization
		this.state = 0;
		this.ownerFlag = false;
		this.x = -1;
		this.y = -1;
		//Create the canvas
		this.canvas = document.getElementById('canvas');
		this.canvas.style.width = window.innerWidth + "px";
		this.canvas.style.height = window.innerHeight + "px";
		this.context = this.canvas.getContext('2d');
		
		
		//Bind class functions
		this.handleInput = this.handleInput.bind(this);
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.loop = this.loop.bind(this);
		
		//set up event handlers
		window.onclick = this.handleInput(event);
		
		//initial render
		this.render();
	}//end constructor
	
	handleInput(event){
		this.x = event.clientX;
		this.x = event.clientY;
	}//end handleInput
	
	update(){
		switch(this.state){
			case 0:
				this.State = Entrance.update(this.X, this.Y);
				break;
			case 1:
				this.State = this.state = Join.update(this.X, this.Y);
				break;
			case 2:
				this.State = Create.update(this.X, this.Y);
				break;
			case 3:
				this.State = Wait.update(this.X, this.Y);
				break;
			case 4:
				this.State = WaitStart.update(this.X, this.Y);
				break;
			case 5:
				this.State = SongPlaying.update(this.X, this.Y);
				break;
			case 6:
				this.State = Out.update(this.X, this.Y);
				break;
			case 7:
				this.State = Vote.update(this.X, this.Y);
				break;
			case 8:
				this.State = Loss.update(this.X, this.Y);
				break;
			case 9:
				this.State = A.update(this.X, this.Y);
				break;
			case 10:
				this.State = B.update(this.X, this.Y);
				break;
			case 11:
				this.State = Winner.update(this.X, this.Y);
				break;
		}//end switch(state)
		this.X = -1;
		this.Y = -1;
	}//end update
	
	render(){
		switch(this.state){
			case 0:
				Entrance.render(this.context);
				break;
			case 1:
				toin.render(this.context);
				break;
			case 2:
				Create.render(this.context);
				break;
			case 3:
				Wait.render(this.context);
				break;
			case 4:
				WaitStart.render(this.context);
				break;
			case 5:
				SongPlaying.render(this.context);
				break;
			case 6:
				Out.render(this.context);
				break;
			case 7:
				Vote.render(this.context);
				break;
			case 8:
				Loss.render(this.context);
				break;
			case 9:
				A.render(this.context);
				break;
			case 10:
				B.render(this.context);
				break;
			case 11:
				Winner.render(this.context);
				break;
		}//end switch(state)
	}//end render
	
	loop() {
	  this.update();
      this.render();
	}//end loop
	
}
new Game();

