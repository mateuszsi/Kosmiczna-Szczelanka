function ClassRocket()
{
	this.model;
	this.speed;
	this.radius;
	this.columns;
	this.rows;
	
	this.Init = function()
	{
		this.model = new ClassModel();
		this.speed = 5;
		this.radius = 16;
		this.columns = 2;
		this.rows = 2;
		
		this.model.Init(32, 32, 'Rocket.png');
	}
	
	this.Draw = function(angle, pos, position, framex, framey)
	{
		var vec = {};
		vec[0] = -pos[0];
		vec[1] = -pos[1];
		vec[2] = -pos[2];
		this.model.ModelPosition(position);
		this.model.ModelChangePosition(vec);
		this.model.ModelRotate(angle);
		this.model.ModelDraw(framex, framey, this.columns, this.rows);
	}
}