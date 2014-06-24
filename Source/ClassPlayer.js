function ClassPlayer()
{
	this.position;
	this.angle;
	this.speed;
	this.framex;
	this.framey;
	this.state;
	this.animTime;
	
	this.Init = function()
	{
		this.position = [0,0,0];
		this.angle = 0;
		this.speed = 0;
		this.framex = 0;
		this.framey = 0;
		this.state = 'FULLHEALTH';
		this.animTime = 0;
	}
	
	this.ChangeAngle = function(direction)
	{
		var ag;
		ag = fighter.agility;
		
		if(direction == 'RIGHT')
		{
			ag = -ag;
			this.angle -= ag;
		}
		if(direction == 'LEFT')
			this.angle -= ag;
			
		if(this.angle > 360 || this.angle < -360)
			this.angle = 0;
	}
	
	this.ChangePosition = function()
	{
		this.position[0] += this.speed*Math.cos(this.angle*Math.PI/180);
		this.position[1] += this.speed*Math.sin(this.angle*Math.PI/180);
	}
	
	this.ChangeSpeed = function(direction)
	{
		var maxSpeed;
		maxSpeed = fighter.speed;
		
		if(direction == 'UP')
			this.speed += 0.1;
		if(direction == 'DOWN')
			this.speed -= 0.1;
			
		if(this.speed >= maxSpeed)
			this.speed = maxSpeed;
		if(this.speed <= -maxSpeed)
			this.speed = -maxSpeed;
	}
	
	this.Anim = function()
	{
		var maxCol = fighter.columns;
		if(this.state == 'FULLHEALTH')
			this.framey = 0;
		if(this.state == 'MIDDLEHEALTH')
			this.framey = 1;
		if(this.state == 'MINIMUMHEALTH')
			this.framey = 2;
		if(this.state == 'DESTROY')
			this.framey = 3;
			
		if(this.animTime == 5)
			this.framex += 1;
		if(this.framex > maxCol)
			this.framex = 0;
			
		this.animTime++;
		if(this.animTime > 5)
			this.animTime = 0;
	}
	
	this.Draw = function()
	{
		var vec = [0,0,0];
		fighter.Draw(vec, this.angle, this.framex, this.framey);
	}
}