function normal(vec)
{
	var m =  Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2]);
	var f = [vec[0]/m, vec[1]/m, vec[2]/m];
	
	return f;
}

function cross(a, b)
{
	var x = a[1] * b[2] - a[2] * b[1];
	var y = a[2] * b[0] - a[0] * b[2];
	var z = a[0] * b[1] - a[1] * b[0];
	var out = [x, y, z];
	
	return out;
}

function dotProduct(vec1, vec2)
{
	var out = vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
	
	return out;
}

function vectorLength(vec)
{
	var out = Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2]);
	
	return out;
}

var mat4 = 
{
	identity: function()
	{
		var out = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1];
		
		return out;
	},
	
	translate: function(out, vec)
	{
		out[12] = vec[0];
		out[13] = vec[1];
		out[14] = vec[2];
		
		return out;
	},
	
	translate2: function(out, vec)
	{
		out[12] += vec[0];
		out[13] += vec[1];
		out[14] += vec[2];
		
		return out;
	},
	
	scale: function(out, vec)
	{
		out[0] *= vec[0];
		out[5] *= vec[1];
		out[10] *= vec[2];
		
		return out;
	},
	
	rotX: function(out, angle)
	{
		var sin = Math.sin(angle * Math.PI / 180);
		var cos = Math.cos(angle * Math.PI / 180);
		
		out[5] = cos;
		out[6] = sin;
		out[9] = -sin;
		out[10] = cos;
		
		return out;
	},
	
	rotY: function(out, angle)
	{
		var sin = Math.sin(angle * Math.PI / 180);
		var cos = Math.cos(angle * Math.PI / 180);
		
		out[0] = cos;
		out[2] = -sin;
		out[8] = sin;
		out[10] =cos;
		
		return out;
	},
	
	rotZ: function(out, angle)
	{
		var sin = Math.sin(angle * Math.PI / 180);
		var cos = Math.cos(angle * Math.PI / 180);
		
		out[0] = cos;
		out[1] = sin;
		out[4] = -sin;
		out[5] = cos;
		
		return out;
	},
	
	perspective: function(fov, aspect, near, far)
	{
		var range = Math.tan(fov * 0.5) * near;
		var Sx = (2 * near) / (range * aspect + range * aspect);
		var Sy = near / range;
		var Sz = -(far + near) / (far - near);
		var Pz = -(2 * far * near) /(far - near);
		
		var out = [
		Sx, 0, 0, 0,
		0, Sy, 0, 0,
		0, 0, Sz, -1,
		0, 0, Pz, 0];
		
		return out;
	},
	
	ortho: function(right, left, top, bottom)
	{
		var rl = 1/(right-left);
		var tb = 1/(top - bottom);
		var out = [
		rl, 0, 0, 0,
		 0,tb, 0, 0,
		 0, 0, 0, 0,
		 0, 0, 0, 1];
		 
		 return out;
	},
	
	lookAt: function(eye, tar, up)
	{
		var z = [eye[0] - tar[0], eye[1] - tar[1], eye[2] - tar[2]];
		z = normal(z);
		var x = cross(up, z);
		x = normal(x);
		var y = cross(z, x);
		var e = {};
		e[0] = x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2];
		e[1] = y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2];
		e[2] = z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2];
		
		var out = [
		   x[0],    y[0],    z[0], 0,
		   x[1],    y[1],    z[1], 0,
		   x[2],    y[2],    z[2], 0,
		  -e[0],   -e[1],   -e[2], 1];
		
		return out;
	},
}