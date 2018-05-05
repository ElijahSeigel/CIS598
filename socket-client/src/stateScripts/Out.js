//state 6
export default class Out{
	constructor(socket){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		
		this.advance = -1;
		socket.on('advanceL', (result)=>{
		this.advance = result;
		})
	}
	update(x,y, width, height){
		if(this.advance === 0 || this.advance === 1){
			this.advance = -1;
			return 8;
		}
		if(this.advance === 4){
			this.advance = -1;
			return 7;
		}
		return 6;
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
		ctx.fillText("NOT",width/2, 2*height/18);
		ctx.fillText("THIS",width/2, 4*height/18);
		ctx.fillText("TIME",width/2, 6*height/18);
	}
}