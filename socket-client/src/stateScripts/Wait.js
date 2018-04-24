//state 3
export default class Wait{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y, width, height){
		return socket.on('start', (result)=>{
				return {5, result};
			})
	return {3};
		//server communication code goes here
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