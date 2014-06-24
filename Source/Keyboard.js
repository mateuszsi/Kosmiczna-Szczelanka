function GameKey()
{
	if(Keyboard() == 39)
		player.ChangeAngle('RIGHT');
	if(Keyboard() == 37)
		player.ChangeAngle('LEFT');
	if(Keyboard() == 38)
		player.ChangeSpeed('UP');
	if(Keyboard() == 40)
		player.ChangeSpeed('DOWN');
	if(Keyboard() == 32)
	{
		rockets.state = 'ACTIVE';
		rockets.liveTime = 0;
	}
}