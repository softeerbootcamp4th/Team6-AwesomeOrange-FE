import { LINEAR, CURVED, ANY } from "./constants.js";

// ─│┌┐┘└

class PieceData
{
	constructor(shapeChar)
	{
		switch(shapeChar)
		{
			case "─": this.type=LINEAR; this.rotate=0; break;
			case "│": this.type=LINEAR; this.rotate=1; break;
			case "┌": this.type=CURVED; this.rotate=0; break;
			case "┐": this.type=CURVED; this.rotate=1; break;
			case "┘": this.type=CURVED; this.rotate=2; break;
			case "└": this.type=CURVED; this.rotate=3; break;
		}
		this.symbol = shapeChar;
	}
	rotated()
	{
		const newPiece = new PieceData(this.symbol);
		newPiece.rotate = this.rotate + 1;
		return newPiece;
	}
	isCorrect(answer)
	{
		if(answer === ANY) return true;
		if(this.type === LINEAR) return this.rotate % 2 === answer;
		return this.rotate % 4 === answer;
	}
	fixedRotated()
	{
		const newPiece = new PieceData(this.symbol);
		newPiece.rotate = this.rotate % 4;
		return newPiece;
	}
}

export function generatePiece(shapeString)
{
	const rawString = [...shapeString.replace(/\s+/gm, "")];
	return rawString.map( c=>new PieceData(c) );
}

export function generateAnswer(shapeString)
{
	const rawString = [...shapeString.replace(/\s+/gm, "")];
	return rawString.map( c=>{
		switch(c)
		{
			case "─": return 0;
			case "│": return 1;
			case "┌": return 0;
			case "┐": return 1;
			case "┘": return 2;
			case "└": return 3;
			default: return ANY;
		}
	} );
}
