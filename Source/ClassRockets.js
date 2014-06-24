function ClassRockets()
{
	this.position;
	this.angle;
	this.speed;
	this.state;
	this.rocket;
	this.animTime;
	this.framex;
	this.framey;
	this.liveTime;
	
	this.Init = function()
	{
		this.position = [0,0,0];
		this.angle = 0;
		this.speed = 0;
		this.state = 'UNACTIVE';
		this.animTime = 0;
		this.framex = 0;
		this.framey = 0;
		this.liveTime = 0;
		this.rocket = new ClassRocket();
		
		this.rocket.Init();
	}
	
	this.Live = function()
	{
		this.liveTime++;
		
		if(this.liveTime > 1500)
		{
			this.liveTime = 1501;
			this.state = 'UNACTIVE';
		}
	}
	
	this.Animation = function()
	{
		if(this.animTime == 5)
			this.framex += 1;
		if(this.framex > 1)
		{
			this.framey++;
			this.framex = 0;
		}
		if(this.framey > 1)
			this.framey = 0;
			
		this.animTime++;
		if(this.animTime > 5)
			this.animTime = 0;
	}
	
	this.ChangePosition = function()
	{
		this.position[0] += this.speed*Math.cos(this.angle*Math.PI/180);
		this.position[1] += this.speed*Math.sin(this.angle*Math.PI/180);
	}
	
	this.Draw = function(pos)
	{
		if(this.state == 'ACTIVE')
			this.rocket.Draw(this.angle, pos, this.position, this.framex, this.framey);
	}
}