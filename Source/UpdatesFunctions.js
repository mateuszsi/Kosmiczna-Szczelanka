function Collision(pos1, pos2, rad1, rad2)
{
	var a = {};
	a[0] = pos1[0] - pos2[0];
	a[1] = pos1[1] - pos2[1];
	var length = Math.sqrt(a[0]*a[0] + a[1]*a[1]);
	rad1 = -rad1;
	var b =  rad2 - rad1;
	var c = length - b;
	
	if(c < 0)
		return true;
	else
		return false;
}

function Reflection(pos1, pos2, angle)
{
	var n = {};
	n[0] = pos2[0] - pos1[0];
	n[1] = pos2[1] - pos1[1];
	n[2] = 0;
	n = normal(n);
	var v = {};
	v[0] = Math.cos(angle*Math.PI/180);
	v[1] = Math.sin(angle*Math.PI/180);
	v[2] = 0;
	var dot = dotProduct(v, n);
	var result = {};
	result[0] = v[0] - 2 * n[0] * dot;
	result[1] = v[1] - 2 * n[1] * dot;
	result[2] = 0;
	var nor = [1,0,0];
	dot = dotProduct(result, nor);
	var a = vectorLength(result);
	var b = vectorLength(nor);
	var outAngle = Math.acos(dot / (a * b))*(180/Math.PI);
	
	return outAngle;
}

function Update()
{
	GameKey();
	player.ChangePosition();
	rockets.ChangePosition();
	player.Anim();
	rockets.Animation();
	rockets.Live();
	object[0].ChangePosition();
	object[1].ChangePosition();
	
	for(var i=0; i<2; i++)
	{
		if(Collision(player.position, object[i].position, fighter.radius, object[i].radius) == true)
		{
			player.angle = Reflection(player.position, object[i].position, player.angle);
			object[i].angle = Reflection(object[i].position, player.position, object[i].angle);
			if(object[i].speed == 0)
				object[i].speed = 5;
		}
	}
	
	if(Collision(object[0].position, object[1].position, object[0].radius, object[1].radius) == true)
	{
		object[0].angle = Reflection(object[0].position, object[1].position, object[0].angle);
		object[1].angle = Reflection(object[1].position, object[0].position, object[1].angle);
	}
}