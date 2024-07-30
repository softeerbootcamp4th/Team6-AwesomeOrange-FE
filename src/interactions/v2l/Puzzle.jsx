import { useState } from "react";
import { generatePiece, generateAnswer } from "./utils.js";
import PuzzlePiece from "./PuzzlePiece.jsx";

// ─│┌┐┘└

function Puzzle()
{
	const [ answer, setAnswer ] = useState(
		generateAnswer(`
			─┐.
			.│.
			.└─`
		)
	);
	const [ piece, setPiece ] = useState(
		generatePiece(`
			│┘─
			─││
			│┘│`
		)
	);

	return <div>
		<div className="grid grid-rows-3 grid-cols-3">
			{ piece.map( (shape, i)=>{
				const onClick = ()=>{
					setPiece( board=>{
						const newBoard = [...board];
						newBoard[i] = board[i].rotated();
						return newBoard;
					} );
				}
				const fixRotate = ()=>{
					setPiece( board=>{
						const newBoard = [...board];
						newBoard[i] = board[i].fixedRotated();
						return newBoard;
					} );
				}

				return <PuzzlePiece shape={shape} key={`puzzle-${i}`} onClick={onClick} fixRotate={fixRotate} />;
			} ) }
		</div>
	</div>
}

export default Puzzle;