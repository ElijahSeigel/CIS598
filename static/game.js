//game.js

//legacy from when I was using the babel transpiler
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
				this.state = entrance.update(this.X, this.Y);
				if(this.State == 2) ownerFlag = true;
				break;
			case 1:
				this.state = join.update(this.X, this.Y);
				break;
			case 2:
				this.state = create.update(this.X, this.Y);
				break;
			case 3:
				this.state = wait.update(this.X, this.Y);
				break
			case 4:
				this.state = waitStart.update(this.X, this.Y);
				break;
			case 5:
				this.state = songPlaying.update(this.X, this.Y);
				break;
			case 6:
				this.state = out.update(this.X, this.Y);
				break;
			case 7:
				this.state = vote.update(this.X, this.Y);
				break;
			case 8:
				this.state = loss.update(this.X, this.Y);
				break;
			case 9:
				this.state = a.update(this.X, this.Y);
				break;
			case 10:
				this.state = b.update(this.X, this.Y);
				break;
			case 11:
				this.state = winner.update(this.X, this.Y);
				break;
		}//end switch(state)
		this.X = -1;
		this.Y = -1;
	}//end update
	
	render(){
		switch(this.state){
			case 0:
				Entrance.render(this.context, this.ownerFlag);
				break;
			case 1:
				toin.render(this.context, this.ownerFlag);
				break;
			case 2:
				Create.render(this.context, this.ownerFlag);
				break;
			case 3:
				Wait.render(this.context, this.ownerFlag);
				break;
			case 4:
				WaitStart.render(this.context, this.ownerFlag);
				break;
			case 5:
				SongPlaying.render(this.context, this.ownerFlag);
				break;
			case 6:
				Out.render(this.context, this.ownerFlag);
				break;
			case 7:
				Vote.render(this.context, this.ownerFlag);
				break;
			case 8:
				Loss.render(this.context, this.ownerFlag);
				break;
			case 9:
				A.render(this.context, this.ownerFlag);
				break;
			case 10:
				B.render(this.context, this.ownerFlag);
				break;
			case 11:
				Winner.render(this.context, this.ownerFlag);
				break;
		}//end switch(state)
	}//end render
	
	loop() {
	  this.update();
      this.render();
	}//end loop
	
}

//a class for each state

//state 0
class Entrance{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 1
class Join{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);v
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 2
class create{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 3
class Wait{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 4
class WaitStart{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y, ownerFlag){
		
	}
	render(ctxt){
		
	}
}

//state 5
class SongPlaying{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 6
class Out{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 7
class Vote{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 8
class Loss{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 9
class A{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 10
class B{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//state 11
class Winner{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y){
		
	}
	render(ctxt, ownerFlag){
		
	}
}

//start the client code
new Game();

