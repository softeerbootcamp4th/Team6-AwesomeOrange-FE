import { generatePiece, generateAnswer } from "./utils.js";

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
				let backtrackedCursor = stack[stack.length-1];
				hubo = getNextCursorHubo(backtrackedCursor);
				if(hubo.length !== 0) break;
				stack.pop();
			}
		}
		else stack.push(cursor);
		cursor = hubo[randInt(0,hubo.length)];
	}
	stack.push(cursor);

	return stack;
}

function getDirection(base, target)
{
	let dx = target[0] - base[0];
	let dy = target[1] - base[1];

	if(dx === 0 && dy === 1) return 0b0001; // down
	if(dx === 1 && dy === 0) return 0b0010; // right
	if(dx === -1 && dy === 0) return 0b0100; // left
	if(dx === 0 && dy === -1) return 0b1000; // up
	return 0b0000; 
}

// ─│┌┐┘└
function getShapeChar(before, after)
{
	const code = before | after;
	switch(code)
	{
		case 0b1100: return "┘";
		case 0b1010: return "└";
		case 0b1001: return "│";
		case 0b0110: return "─";
		case 0b0101: return "┐";
		case 0b0011: return "┌";
		default: return ".";
	}
}

function generateRandomPuzzle()
{
	const WIDTH = 3;
	const HEIGHT = 3;
	const path = generateRandomPath(WIDTH,HEIGHT);

	// path에 대한 길 shape를 생성	
	const shapes = [getShapeChar(0b0100, getDirection(path[0], path[1]))];
	for(let i=1; i<path.length-1; i++)
	{
		const before = getDirection(path[i], path[i-1]);
		const after = getDirection(path[i], path[i+1]);
		shapes.push( getShapeChar(before, after) );
	}
	shapes.push( getShapeChar(getDirection(path[path.length-1], path[path.length-2]), 0b0010) );

	// shape 리스트를 3x3 그리드에 맞도록 재배열

	const shapeBoard = new Array(WIDTH*HEIGHT).fill('.');
	path.forEach( ([x,y], i)=>{
		shapeBoard[y*HEIGHT+x] = shapes[i];
	} );

	const answer = generateAnswer( shapeBoard.join('') );
	const board = generatePiece( shapeBoard.map( (c)=>{
		if(c !== ".") return c;
		if(Math.random() > 0.5) return "─";
		return "┘";
	} ).join('') );
	board.forEach( piece=>piece.rotate = randInt(0, 4) );
	
	return [answer, board];
}

export default generateRandomPuzzle;
