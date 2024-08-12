import { setupWorker } from "msw/browser";
import commentHandler from "./comment/mock.js";
import authHandler from "./auth/mock.js";
import fcfsHandler from "./fcfs/mock.js";

// mocking은 기본적으로 각 feature 폴더 내의 mock.js로 정의합니다.
// 새로운 feature의 mocking을 추가하셨으면, mock.js의 setupWorker 내부 함수에 인자를 spread 연산자를 이용해 추가해주세요.
// 예시 : export default setupWorker(...authHandler, ...questionHandler, ...articleHandler);
export default setupWorker(...commentHandler, ...authHandler, ...fcfsHandler);