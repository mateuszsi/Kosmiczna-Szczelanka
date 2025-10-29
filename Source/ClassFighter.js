function ClassFighter()
{
	this.name;
	this.model;
	this.height;
	this.width;
	this.columns;
	this.rows;
	this.speed;
	this.agility;
	this.health;
	this.radius;
	
	this.Init = function(path)
	{
		var temp = LoadFile(path + '.txt');
		var temp2 = temp.split('|');
		
		this.name = temp2[0];
		this.height = temp2[1];
		this.width = temp2[2];
		this.columns = temp2[3];
		this.rows = temp2[4];
		this.speed = temp2[5];
		this.agility = temp2[6];
		this.health = temp2[7];
		this.radius = temp2[8];
		
		this.model = new ClassModel();
		
		this.model.Init(this.width, this.height, this.name + '.png');
	}
	
	this.Draw = function(position, angle, framex, framey)
	{
		this.model.ModelPosition(position);
		this.model.ModelRotate(angle);
		this.model.ModelDraw(framex, framey, this.columns, this.rows);
        //testowy komentarz
	}
}