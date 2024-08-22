import { LINEAR, CURVED, ANY, DOWN, RIGHT, LEFT, UP } from "./constants.js";

// ─│┌┐┘└

class PieceData {
  constructor(shapeChar) {
    switch (shapeChar) {
      case "─":
        this.type = LINEAR;
        this.rotate = 0;
        break;
      case "│":
        this.type = LINEAR;
        this.rotate = 1;
        break;
      case "┌":
        this.type = CURVED;
        this.rotate = 0;
        break;
      case "┐":
        this.type = CURVED;
        this.rotate = 1;
        break;
      case "┘":
        this.type = CURVED;
        this.rotate = 2;
        break;
      case "└":
        this.type = CURVED;
        this.rotate = 3;
        break;
    }
    this.symbol = shapeChar;
  }
  rotated() {
    const newPiece = new PieceData(this.symbol);
    newPiece.rotate = this.rotate + 1;
    return newPiece;
  }
  isCorrect(answer) {
    if (answer === ANY) return true;
    if (this.type === LINEAR) return this.rotate % 2 === answer;
    return this.rotate % 4 === answer;
  }
  fixedRotated() {
    const newPiece = new PieceData(this.symbol);
    newPiece.rotate = this.rotate % 4;
    return newPiece;
  }
  getConnectData() {
    if (this.type === LINEAR) {
      if (this.rotate % 2) return UP | DOWN; // │
      else return LEFT | RIGHT; // ─
    } else if (this.type === CURVED) {
      switch (this.rotate % 4) {
        case 0: return RIGHT | DOWN; //┌
        case 1: return DOWN | LEFT; //┐
        case 2: return LEFT | UP; //┘
        case 3: return UP | RIGHT; //└
      }
    } else return 0b0000;
  }
  getLabel() {
    switch(this.getConnectData()) {
      case (UP | DOWN): return "위에서 아래로 이어짐."; // linear, rotate % 2 === 1
      case (LEFT | RIGHT): return "왼쪽에서 오른쪽으로 이어짐."; // linear, rotate % 2 === 0
      case (RIGHT | DOWN): return "오른쪽에서 아래로 이어짐."; // curved, rotate % 4 === 0
      case (DOWN | LEFT): return "왼쪽에서 아래로 이어짐."; // curved, rotate % 4 === 1
      case (LEFT | UP): return "왼쪽에서 위로 이어짐."; // curved, rotate % 4 === 2
      case (UP | RIGHT): return "오른쪽에서 위로 이어짐."; // curved, rotate % 4 === 3
      default : return "알 수 없는 모양.";
    }
  }
}

export default PieceData;