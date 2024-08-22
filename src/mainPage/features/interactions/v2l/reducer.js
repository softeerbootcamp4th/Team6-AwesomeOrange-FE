import generateRandomPuzzle from "./generateRandom.js";
import { checkPuzzle, getLinkedPuzzleState } from "./utils.js";

function getLinkSubtitle(board)
{
	const linked = getLinkedPuzzleState(board, 3, 3);
	if(linked.length === 0) return "현재 퍼즐 조각이 이어져 있지 않습니다.";
	else return `현재 퍼즐 조각 (${linked.map(n=>`${n+1}번`).join(", ")})이 이어져 있습니다.`;
}

function getAnswerStateSubtitle(prevBoard, newBoard, answer)
{
	const prevIsAnswer = checkPuzzle(prevBoard, answer);
	const nextIsAnswer = checkPuzzle(newBoard, answer);

	if(prevIsAnswer === nextIsAnswer) return "";
	if(nextIsAnswer) return "퍼즐이 전부 이어졌습니다!";
	return "이어졌던 퍼즐이 끊어졌습니다.";
}

function puzzleReducer(state, action)
{
	switch(action.type)
	{
		case "reset": {
			const [randAnswer, randPiece] = generateRandomPuzzle();
			return {
				answer: randAnswer,
				piece: randPiece,
				subtitle: action.initialized ? state.subtitle : "퍼즐이 초기화되었습니다."
			};
		}
		case "rotate": {
			const newBoard = [...state.piece];
			const i = action.index;
			newBoard[i] = state.piece[i].rotated();

			return {
				...state, 
				piece: newBoard,
				subtitle: `${i+1}번 퍼즐 조각을 돌렸습니다. ${getLinkSubtitle(newBoard)} ${getAnswerStateSubtitle(state.piece, newBoard, state.answer)}`
			};
		}
		case "reconcile-rotate": {
			const newBoard = [...state.piece];
			const i = action.index;
			newBoard[i] = state.piece[i].fixedRotated();
			return { ...state, piece: newBoard };
		}
	}
}

export default puzzleReducer;