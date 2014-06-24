function ClassObject()
{
	this.position;
	this.angle;
	this.model;
	this.radius;
	this.speed;
	
	this.Init = function()
	{
		this.position = [0,0,0];
		this.angle = 0;
		this.radius = 128;
		this.speed = 0;
		this.model = new ClassModel();
		
		this.model.Init(256, 256, 'Rock.png');
	}
	
	this.NewPosition = function(vec)
	{
		this.position[0] = vec[0];
		this.position[1] = vec[1];
		this.position[2] = vec[2];
	}
	
	this.ChangePosition = function()
	{
		this.position[0] += this.speed*Math.cos(this.angle*Math.PI/180);
		this.position[1] += this.speed*Math.sin(this.angle*Math.PI/180);
	}
	
	this.Draw = function(pos)
	{
		var vec = {};
		vec[0] = -pos[0];
		vec[1] = -pos[1];
		vec[2] = -pos[2];
		this.model.ModelPosition(this.position);
		this.model.ModelChangePosition(vec);
		this.model.ModelRotate(this.angle);
		this.model.ModelDraw(0, 0, 1, 1);
	}
}