//state 4
export default class WaitStart{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.code = "unset";
		socket.on('start', (result)=>{
				this.code = result;
		})
	}
	update(x,y, width, height, socket, id){
		if(x>width/16
		   &&x<(width-width/16)
		   &&y>(12*height/18)
		   &&y<(15*height/18)){
			socket.emit('start', id);
		}//end if xy in start
		if(this.code !== "unset"){	
			return {5, this.code}; 
		}
		return {4};
	}
	render(ctx, ownerFlag, width, height, input){
		input.hidden = true;
		//background
		ctx.fillStyle = 'rgb(52,152,219)';
		ctx.fillRect(0, 0, width, height);
		
		//title
		ctx.fillStyle = 'rgb(174,214,241)';
		var font_size = height/9;
		ctx.font = 'Bold '+font_size+'px Courier';
		ctx.textAlign = "center";
		ctx.fillText("WAITING",width/2, 2*height/18);
		ctx.fillText("FOR",width/2, 4*height/18);
		ctx.fillText("PLAYERS",width/2, 6*height/18);
		
		//button
		ctx.fillStyle = 'rgb(27,79,114)';
		ctx.fillRect(width/16, 12*height/18, 7*width/8, 3*height/18);
		
		//labels
		ctx.fillStyle = 'rgb(52,152,219)';
		ctx.font = font_size+'px Courier';
		ctx.fillText("START",width/2, 14*height/18);
	}
}