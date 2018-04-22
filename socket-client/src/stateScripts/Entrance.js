//state 0
export default class Entrance{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		
	}
	update(x,y, width, height){
		if(x>(width/16)
		   &&x<(width-width/16)
		   &&y>(8*height/18)
		   &&y<(11*height/18)){

			return 2;
		}//end if xy in create
		
		if(x>width/16
		   &&x<(width-width/16)
		   &&y>(12*height/18)
		   &&y<(15*height/18)){
			return 1;
		}//end if xy in join
		
		return 0;//click not in button, don't care
	}//end update
	
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
		ctx.fillText("OFF",width/2, 6*height/18);
		
		//buttons
		ctx.fillStyle = 'rgb(27,79,114)';
		ctx.fillRect(width/16, 8*height/18, 7*width/8, 3*height/18);
		ctx.fillRect(width/16, 12*height/18, 7*width/8, 3*height/18);
		
		//labels
		ctx.fillStyle = 'rgb(52,152,219)';
		ctx.font = font_size+'px Courier';
		ctx.fillText("CREATE",width/2, 10*height/18);
		ctx.fillText("JOIN",width/2, 14*height/18);
	}//end render
}//end state 0