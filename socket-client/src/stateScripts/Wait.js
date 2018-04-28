//state 3
export default class Wait{
	constructor(socket){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.code = "unset";
		this.song = "";
		socket.on('start', (result)=>{
				this.code = result[0];
				this.song = result[1];
		})
	}
	update(x,y, width, height){
		if(this.code !== "unset"){	
			var temp1 = this.code;
			var temp2 = this.song;
			this.code = "unset";
			this.song = "";
			return [5, temp1, temp2]; 
		}
	return [3];
	}
	render(ctx, ownerFlag, width, height, input){
		input.hidden = true;
		ctx.save();
		
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
	
		ctx.restore();
	}
}