function ClassModel()
{
	this.vertex;
	this.texCoord;
	this.texture;
	
	this.Init = function(width, height, name)
	{
		var x = width / 2;
		var y = height / 2;
		
		this.texture = InitTexture(name);
		
		this.vertex = gl.createBuffer();
		this.texCoord = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex);
		var pos = [-x,-y,0, x,-y,0, x,y,0, x,y,0, -x,-y,0, -x,y,0];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoord);
		var tex = [0,1, 0,0, 1,0, 1,0, 0,1, 1,1];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tex), gl.STATIC_DRAW);
	}
	
	this.ModelPosition = function(pos)
	{
		MM = mat4.translate(MM, pos);
		gl.uniformMatrix4fv(program.unifromMM, false, MM);
	}
	
	this.ModelChangePosition = function(pos)
	{
		MM = mat4.translate2(MM, pos);
		gl.uniformMatrix4fv(program.unifromMM, false, MM);
	}
	
	this.ModelRotate = function(angle)
	{
		MM = mat4.rotZ(MM, angle);
		gl.uniformMatrix4fv(program.uniformMM, false, MM);
	}
	
	this.ModelDraw = function(framex, framey, numCol, numRow)
	{
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex);
		gl.vertexAttribPointer(program.vertexPointer, 3, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoord);
		gl.vertexAttribPointer(program.texCoordPointer, 2, gl.FLOAT, false, 0,0);
		
		program.column = gl.getUniformLocation(program, 'column');
		program.row = gl.getUniformLocation(program, 'row');
		program.numCol = gl.getUniformLocation(program, 'numCol');
		program.numRow = gl.getUniformLocation (program, 'numRow');
		
		var column = framex / numCol;
		var row = framey / numRow;
		
		gl.uniform1f(program.column, column);
		gl.uniform1f(program.row, row);
		gl.uniform1f(program.numCol, numCol);
		gl.uniform1f(program.numRow, numRow);
		
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}
}