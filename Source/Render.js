function Render()
{
	gl.viewport(0,0, gl.width, gl.height);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	PM = mat4.identity();
	MM = mat4.identity();
	
	PM = mat4.ortho(gl.width, 0, 0, gl.height);
	
	program.vertexPointer = gl.getAttribLocation(program, 'vertex');
	program.texCoordPointer = gl.getAttribLocation(program, 'texCoord');
	program.uniformPM = gl.getUniformLocation(program, 'PM');
	program.uniformMM = gl.getUniformLocation(program, 'MM');
	program.sampler = gl.getUniformLocation(program, 'samp');
	
	gl.enableVertexAttribArray(program.vertexPointer);
	gl.enableVertexAttribArray(program.texCoordPointer);
	gl.uniformMatrix4fv(program.uniformPM, false, PM);
	gl.uniformMatrix4fv(program.uniformMM, false, MM);
	gl.uniform1i(program.sampler, 0);
	
	player.Draw();
	object[0].Draw(player.position);
	object[1].Draw(player.position);
	rockets.Draw(player.position);
}