const dir = [ [1,0], [0,1], [-1,0], [0,-1] ];

function randInt(min, max)
{
	return Math.floor( Math.random() * (max-min) ) + min;
}

function generateRandomPath(width, height)
{
	let traced = Array.from({length: width}, ()=>new Array(height).fill(false));
	const stack = [];
	let cursor = [0,0];

	function getNextCursorHubo([x,y])
	{
		return dir
			.map( ([dx, dy])=>[x+dx, y+dy] )
			.filter( ([tx, ty])=>{
				if(tx < 0 || ty < 0) return false;
				if(tx >= width || ty >= height) return false;
				if(traced[tx][ty] ) return false;
				return true;
			} );
	}

	while(cursor[0] !== width-1 || cursor[1] !== height-1)
	{
		traced[cursor[0]][cursor[1]] = true;
		let hubo = getNextCursorHubo(cursor);
		// backtracking
		if(hubo.length === 0)
		{
			while(stack.length > 0)
			{
				let backtrackedCursor = stack.pop();
				hubo = getNextCursorHubo(backtrackedCursor);
				if(hubo.length !== 0) break;
			}
		}
		stack.push(cursor);
		cursor = hubo[randInt(0,hubo.length)];
	}
	stack.push(cursor);

	return stack;
}
