//state 10
export default class B{
	constructor(){
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}
	update(x,y, width, height){
		
	}
	render(ctx, ownerFlag, width, height){
		
	}
}