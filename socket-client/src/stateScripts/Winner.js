//state 11
export default class Winner{
	constructor(socket){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		
		this.code = "unset";
		this.song = "";
		socket.on('restart',(code)=>{
			this.code = code[0];
			this.song = code[1];
		})
	}
	update(x,y, width, height, ownerFlag, socket, id){
		if(ownerFlag){
			if(x>width/16
		     &&x<(width-width/16)
		     &&y>(12*height/18)
		     &&y<(15*height/18)){
				socket.emit('restart', id); 
			}//end if xy in restart
		}
		
		if(this.code !== "unset"){
			var temp1 = this.code;
			this.code = "unset";
			var temp2 = this.song;
			this.song = "";
			return [5, temp1, temp2]; 
		}
		
		return [11];
	}
	render(ctx, ownerFlag, width, height){
		//background
		ctx.fillStyle = 'rgb(52,152,219)';
		ctx.fillRect(0, 0, width, height);
		
		//title
		ctx.fillStyle = 'rgb(174,214,241)';
		var font_size = height/9;
		ctx.font = 'Bold '+font_size+'px Courier';
		ctx.textAlign = "center";
		ctx.fillText("SILENT",width/2, 2*height/18);
		ctx.fillText("DANCE",width/2, 4*height/18);
		ctx.fillText("CHAMP",width/2, 6*height/18);
		
		if(ownerFlag){
			//buttons
			ctx.fillStyle = 'rgb(27,79,114)';
			ctx.fillRect(width/16, 12*height/18, 7*width/8, 3*height/18);
			
			//labels
			ctx.fillStyle = 'rgb(52,152,219)';
			ctx.font = font_size+'px Courier';
			ctx.fillText("RESTART",width/2, 14*height/18);
		}
	}
}