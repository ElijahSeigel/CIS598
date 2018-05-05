//state 5
export default class SongPlaying{
	constructor(socket){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.inputLast = "";
		this.input = "_ _ _ _"
		//this.round = 1;
		
		this.result = "unset";
		socket.on('guess', (result)=>{
				console.log(result)
				this.result = result;
		})
		
		this.advance = -1;
		this.song = "";
		socket.on('advanceW', (result)=>{
			console.log(result[0]);
			this.advance = result[0];
			this.song = result[1];
		})
		
	}
	update(x,y, width, height, socket, roomID, timer){
		if(this.result === 'unset'){
			if(y>8*height/18&&y<10*height/18){
				if(x>width/16&&x<5*width/16){//7
					//console.log("7");
					this.input = this.input.replace("_", "7");
					this.inputLast = "7";
				}//end if first column
				if(x>3*width/8&&x<5*width/8){//8
					//console.log("8");
					this.input = this.input.replace("_", "8");
					this.inputLast = "8";
				}//end if second column
				if(x>11*width/16&&x<15*width/16){//9
					//console.log("9");
					this.input = this.input.replace("_", "9");
					this.inputLast = "9";
				}//end if third column
			}//end in first row
			if(y>10.5*height/18&&y<12.5*height/18){
				if(x>width/16&&x<5*width/16){//4
					//console.log("4");
					this.input = this.input.replace("_", "4");
					this.inputLast = "4";
				}//end if first column
				if(x>3*width/8&&x<5*width/8){//5
					//console.log("5");
					this.input = this.input.replace("_", "5");
					this.inputLast = "5";
				}//end if second column
				if(x>11*width/16&&x<15*width/16){//5
					//console.log("6");
					this.input = this.input.replace("_", "6");
					this.inputLast = "6";
				}//end if third column
			}//end in second row
			if(y>13*height/18&&y<15*height/18){
				if(x>width/16&&x<5*width/16){//1
					//console.log("1");
					this.input = this.input.replace("_", "1");
					this.inputLast = "1";
				}//end if first column
				if(x>3*width/8&&x<5*width/8){//2
					//console.log("2");
					this.input = this.input.replace("_", "2");
					this.inputLast = "2";
				}//end if second column
				if(x>11*width/16&&x<15*width/16){//3
					//console.log("3");
					this.input = this.input.replace("_", "3");
					this.inputLast = "3";
				}//end if third column
			}//end in third row
			if(y>15.5*height/18&&y<17.5*height/18){
				if(x>width/16&&x<5*width/16){//ENT
					//this.input = "_ _ _ _";
					//console.log("ENT");
					//check with server if input is correct
					socket.emit('guess', [roomID, this.input]);			
				}//end if first column
				if(x>3*width/8&&x<5*width/8){//0
					//console.log("0");
					this.input = this.input.replace("_", "0");
					this.inputLast = "0";
				}//end if second column
				if(x>11*width/16&&x<15*width/16){//backspace
					//console.log("<X");
					if(this.inputLast !== ''){
						var replaceIndex = this.input.lastIndexOf(this.inputLast);
						this.input = ""+this.input.substring(0, replaceIndex)+"_"+this.input.substring(replaceIndex+1);
						if(replaceIndex>0){
							this.inputLast = this.input.charAt(replaceIndex-2);
						}
						else{
							this.inputLast = '';
						}
					}
					
				}//end if third column
			}//end in fourth row
		}
		if(this.advance === 1){
			this.song = "";
			this.advance = -1;
			this.input= "_ _ _ _";
			this.result = 'unset';
			return [11];
		}
		if(this.advance === 2){
			var temp = this.song;
			this.song = "";
			this.advance = -1;
			this.input= "_ _ _ _";
			this.result = 'unset';
			return [9,1,temp]
		}
		if(this.advance === 3){
			var temp = this.song;
			this.song = "";
			this.advance = -1;
			this.input= "_ _ _ _";
			this.result = 'unset';
			return [10,1,temp];
		}
		if(this.result === 'failure'){
			this.advance = -1;
			this.song = "";
			this.input= "_ _ _ _";
			this.result = 'unset';
			return [6];
		}
		if(this.advance === 5){
			var temp = this.song;
			this.song = "";
			this.advance = -1;
			this.input= "_ _ _ _";
			this.result = 'unset';
			return [5,1,temp];
		}
		if(timer === 0){
			if(this.result === 'unset'){
				socket.emit('guess', [roomID, '0 0 0 0']);
			}
			socket.emit('reset', roomID);
		}
		return [5, 0];
	}
	render(ctx, ownerFlag, width, height, code, time){
		
		time = Math.floor(time/100)
				
		var minutes = Math.floor( time / 60 );
        if (minutes < 10) minutes = "0" + minutes;
        var seconds = time % 60;
        if (seconds < 10) seconds = "0" + seconds; 
        var timerText = minutes + ':' + seconds;
		
		//background
		ctx.fillStyle = 'rgb(52,152,219)';
		ctx.fillRect(0, 0, width, height);
		
		//title
		ctx.fillStyle = 'rgb(174,214,241)';
		var font_size = height/9;
		ctx.font = 'Bold '+font_size+'px Courier';
		ctx.textAlign = "center";
		ctx.fillText(timerText ,width/2, 2*height/18);
		ctx.fillText(code ,width/2, 4*height/18);
		if(this.result === 'unset'){
			ctx.fillText(this.input,width/2, 6*height/18);
		}
		if(this.result === 'success'){
			ctx.fillText('SUCCESS',width/2, 6*height/18);
		}
		
		//buttons
		ctx.fillStyle = 'rgb(27,79,114)';
		
		ctx.fillRect(width/16, 8*height/18, 3*width/12, 2*height/18);
		ctx.fillRect(3*width/8, 8*height/18, 3*width/12, 2*height/18);
		ctx.fillRect(11*width/16, 8*height/18, 3*width/12, 2*height/18);
		
		ctx.fillRect(width/16, 10.5*height/18, 3*width/12, 2*height/18);
		ctx.fillRect(3*width/8, 10.5*height/18, 3*width/12, 2*height/18);
		ctx.fillRect(11*width/16, 10.5*height/18, 3*width/12, 2*height/18);
		
		ctx.fillRect(width/16, 13*height/18, 3*width/12, 2*height/18);
		ctx.fillRect(3*width/8, 13*height/18, 3*width/12, 2*height/18);
		ctx.fillRect(11*width/16, 13*height/18, 3*width/12, 2*height/18);
		
		ctx.fillRect(width/16, 15.5*height/18, 3*width/12, 2*height/18);
		ctx.fillRect(3*width/8, 15.5*height/18, 3*width/12, 2*height/18);
		ctx.fillRect(11*width/16, 15.5*height/18, 3*width/12, 2*height/18);
		
		//labels
		ctx.fillStyle = 'rgb(52,152,219)';
		ctx.font = font_size+'px Courier';
		ctx.fillText("7",3*width/16, 9.5*height/18);
		ctx.fillText("8",width/2, 9.5*height/18);
		ctx.fillText("9",13*width/16, 9.5*height/18);
		
		ctx.fillText("4",3*width/16, 12*height/18);
		ctx.fillText("5",width/2, 12*height/18);
		ctx.fillText("6",13*width/16, 12*height/18);
		
		ctx.fillText("1",3*width/16, 14.5*height/18);
		ctx.fillText("2",width/2, 14.5*height/18);
		ctx.fillText("3",13*width/16, 14.5*height/18);
		
		ctx.fillText("0",width/2, 17*height/18);
		ctx.fillText("<X",13*width/16, 17*height/18);
		ctx.font = font_size-.2*font_size+'px Courier';
		ctx.fillText("ENT",3*width/16, 17*height/18);
		
	}//end render
}
