window.onerror = function(msg, url, lineno)
{
	console.log(url + '(' + lineno + '): ' + msg);
}

function LoadFile(path)
{
	var request = new XMLHttpRequest();
	var txt;

	request.onreadystatechange = function()
	{
		if(request.readyState == 4)
			txt = request.responseText;
	}
	request.open('GET', path, false);
	request.send(null);
	
	return txt;
}

function createShader(str, type)
{
	var shader = gl.createShader(type);
	gl.shaderSource(shader, str);
	gl.compileShader(shader);
	
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		throw gl.getShaderInfoLog(shader);
		
	return shader;
}

function createProgram(vstr, fstr)
{
	var program = gl.createProgram();
	var vshader = createShader(vstr, gl.VERTEX_SHADER);
	var fshader = createShader(fstr, gl.FRAGMENT_SHADER);
	gl.attachShader(program, vshader);
	gl.attachShader(program, fshader);
	gl.linkProgram(program);
	
	if(!gl.getProgramParameter(program, gl.LINK_STATUS))
		throw gl.getProgramInfoLog(program);
		
	return program;
}

function KeyDown(event)
{
	pressdKeys[event.keyCode] = true;
}

function KeyUp(event)
{
	pressdKeys[event.keyCode] = false;
}

function Keyboard()
{
	if(pressdKeys[37])   //left
		return 37;
	if(pressdKeys[38])   //up
		return 38;
	if(pressdKeys[39])   //right
		return 39;
	if(pressdKeys[40])   //down
		return 40;
	if(pressdKeys[32])   //space
		return 32;
}

function main()
{
	document.onkeydown = KeyDown;
	document.onkeyup = KeyUp;
	
	var canvas = document.getElementById('canvas');
	gl = canvas.getContext('webgl');
	
	gl.width = canvas.width;
	gl.height = canvas.height;
	
	gl.clearColor(0,0,0,1);
	
	var vstr = LoadFile('vertex.txt');
	var fstr = LoadFile('fragment.txt');
	
	program = createProgram(vstr, fstr);
	gl.useProgram(program);
	
	fighter.Init('Fighter');
	player.Init();
	object[0].Init();
	object[1].Init();
	var vec = [-400,200,0];
	object[0].NewPosition(vec);
	vec = [500,300,0];
	object[1].NewPosition(vec);
	rockets.Init();
	
	setInterval('Game()', 20);
}