import { useState } from "react";
import { generatePiece, generateAnswer } from "./utils.js";
import PuzzlePiece from "./PuzzlePiece.jsx";
import car1x from "./assets/car@1x.png";
import car2x from "./assets/car@2x.png";
import panContainer1x from "./assets/panContainer@1x.png";
import panContainer2x from "./assets/panContainer@1x.png";
import pan from "./assets/pan.svg";

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

	return <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
		<div className="flex items-center h-28 -translate-x-16 md:translate-x-0">
			<img className="object-right w-72 h-28 object-scale-down" width="279" height="100" src={car1x} srcSet={`${car1x} 1x, ${car2x} 2x`} alt="start position" />
			<div className="w-8 h-2 bg-blue-300"></div>
		</div>
		<div className="grid grid-rows-3 grid-cols-3 gap-4 z-10 flex-shrink-0">
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
		<div className="flex items-end absolute bottom-0 -right-28 md:relative md:bottom-auto md:right-auto">
			<div className="w-28 h-28 flex items-center">
				<img className="object-left w-16 h-28 object-scale-down" width="80" height="130" src={panContainer1x} srcSet={`${panContainer1x} 1x, ${panContainer2x} 2x`} alt="start position" />
			</div>
		</div>
	</div>
}

export default Puzzle;