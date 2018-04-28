//state 9
export default class A{
	constructor(socket){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		
		this.win = false;
		socket.on('win',()=>{
			this.win = true;
		})
		
		this.loss = false;
		socket.on('loss',()=>{
			this.loss = true;
		})
	}
	update(x,y, width, height){
		if(this.win){
			return 11;
		}
		if(this.loss){
			return 8;
		}
		return 9;
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
		ctx.fillText("FINAL",width/2, 2*height/18);
		ctx.fillText("DANCE",width/2, 4*height/18);
		ctx.fillText("OFF",width/2, 6*height/18);
		
		ctx.font = ''+height/2+'px Courier';
		ctx.fillText("A",width/2, 13*height/16);
	}
}