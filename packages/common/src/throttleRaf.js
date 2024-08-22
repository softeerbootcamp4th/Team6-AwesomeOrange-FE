/**
 * request animation frame에 따라 스로틀링을 적용하는 고차 함수입니다.
 * 스로틀링을 적용시킬 함수를 인자로 넣으면, 스로틀이 적용된 함수를 반환합니다.
 * 스로틀링이 적용된 함수는 원본 함수와 동일한 매개변수를 받습니다.
 *
 * 주로 스크롤 애니메이션이나 마우스 드래그 애니메이션 시, 스로틀링을 걸어 함수의 실행 빈도를 줄여 성능을 향상시키는 용도로 사용합니다.
 */
function throttleRaf(func) {
  let throttleArgs = [];
  let isDelayed = false;
  return function (...args) {
    throttleArgs = args;
    if (isDelayed) return;
    isDelayed = true;
    requestAnimationFrame(() => {
      func(...throttleArgs);
      isDelayed = false;
    });
  };
}

export default throttleRaf;
