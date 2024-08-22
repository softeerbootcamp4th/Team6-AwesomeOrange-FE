import { ANY, DOWN, RIGHT, LEFT, UP } from "./constants.js";
import PieceData from "./PieceData.js";

// ─│┌┐┘└

export function generatePiece(shapeString) {
  const rawString = [...shapeString.replace(/\s+/gm, "")];
  return rawString.map((c) => new PieceData(c));
}

export function generateAnswer(shapeString) {
  const rawString = [...shapeString.replace(/\s+/gm, "")];
  return rawString.map((c) => {
    switch (c) {
      case "─":
        return 0;
      case "│":
        return 1;
      case "┌":
        return 0;
      case "┐":
        return 1;
      case "┘":
        return 2;
      case "└":
        return 3;
      default:
        return ANY;
    }
  });
}

export function checkPuzzle(pieces, answer) {
  return pieces.every((piece, i) => piece.isCorrect(answer[i]));
}

export function getLinkedPuzzleState(pieces, width, height)
{
  const linked = [];
  let [x, y] = [0, 0];
  let prev = LEFT;
  while(x >= 0 && x < width && y >= 0 && y < height)
  {
    // 직전 연결된 상태와 현재 커서가 연결되어 있지 않으면 return
    const cursor = y * width + x;
    const connectData = pieces[cursor].getConnectData();
    if((prev & connectData) === 0) return [linked, cursor];
    // 연결되어 있다면 인덱스를 배열에 넣음
    linked.push(cursor);
    // 다음 연결된 상태를 가져옴
    prev = connectData ^ prev;
    // 다음 연결 상태를 기반으로 커서를 옮기고, 다음 연결 상태를 반전시킴 (이전 커서에서 오른쪽 = 다음 커서에서 왼쪽)
    switch(prev)
    {
      case LEFT : x--; prev=RIGHT; break;
      case RIGHT : x++; prev=LEFT; break;
      case UP: y--; prev=DOWN; break;
      case DOWN: y++; prev=UP; break;
      default: return [linked, -1];
    }
  }
  return [linked, -1];
}