//state 12
export default class Instructions{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		
	}//end constructor
	
	update(x,y, width, height){
			if(x>-1 && y>-1){
			return 0;
			}//end if click
		return 12;
	}//end update
	
	render(ctx, ownerFlag, width, height){
		ctx.fillStyle = 'rgb(52,152,219)';
		ctx.fillRect(0, 0, width, height);
		
		//title
		ctx.fillStyle = 'rgb(27,79,114)';
        var font_size = height/18;
        ctx.font = "bold "+font_size+'px Courier';
        ctx.textAlign = "center";
        ctx.fillText("Instructions",width/2, 1.5*height/18);
        //instructions
        ctx.fillStyle = 'rgb(174,214,241)';
		font_size = height/20;
		ctx.font = font_size+'px Courier';
		ctx.textAlign = "left";
		ctx.fillText("Create a room with",width/16, 3*height/18);
        ctx.fillText("a unique six",width/16, 4*height/18);
        ctx.fillText("charachter name",width/16, 5*height/18);
        ctx.fillText("Join a room by",width/16, 7*height/18);
        ctx.fillText("entering the room",width/16, 8*height/18);
        ctx.fillText("name",width/16, 9*height/18);
        ctx.fillText("Put in headphones",width/16, 11*height/18);
        ctx.fillText("and dance until you",width/16, 12*height/18);
        ctx.fillText("find the player",width/16, 13*height/18);
        ctx.fillText("with the same song",width/16, 14*height/18);
        ctx.fillText("Final two go to",width/16, 16*height/18);
        ctx.fillText("a vote",width/16, 17*height/18);
	}//end render
}//end state 12