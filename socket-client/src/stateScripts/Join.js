//state 1
export default class Join{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		
		this.result = 'unset';
		
		socket.on('join_room', (result)=>{
			this.result = result;
		})
	}
	update(x,y, width, height, input){
		if(x>width/16
		   &&x<(width-width/16)
		   &&y>(12*height/18)
		   &&y<(15*height/18)){
			//send room name to server
			socket.emit('join_room', input.value)
		}//end if xy in enter
		if(result === 'failure'){
			input.value = '';
			this.result = 'unset';
			return {1};
		}
		else if (this.result !== 'unset'){
			return {3, result};
		}
		return {1};
	}
	render(ctx, ownerFlag, width, height, input){
		//background
		ctx.fillStyle = 'rgb(52,152,219)';
		ctx.fillRect(0, 0, width, height);
		
		//title
		ctx.fillStyle = 'rgb(174,214,241)';
		var font_size = height/9;
		ctx.font = 'Bold '+font_size+'px Courier';
		ctx.textAlign = "center";
		ctx.fillText("ENTER",width/2, 2*height/18);
		ctx.fillText("ROOM",width/2, 4*height/18);
		ctx.fillText("NAME",width/2, 6*height/18);
		
		//input field
		input.hidden = false;
		input.style = "text-transform:uppercase; text-align: center; background-color: #1B4F72; color: #3498db; position:absolute; top:"+8*height/18+"px; left:"+width/16+"px; width:"+7*width/8+"px; height:"+3*height/18+"px; font:"+font_size+"px courier;";
			
			
		//button
		ctx.fillStyle = 'rgb(27,79,114)';
		ctx.fillRect(width/16, 12*height/18, 7*width/8, 3*height/18);
		
		//labels
		ctx.fillStyle = 'rgb(52,152,219)';
		ctx.font = font_size+'px Courier';
		ctx.fillText("ENTER",width/2, 14*height/18);
	}
}