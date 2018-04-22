//state 6
export default class Out{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y, width, height){
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