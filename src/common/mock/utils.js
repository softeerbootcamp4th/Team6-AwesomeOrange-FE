export function randArr(arr) {
  let idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

export function makeLorem(min, max) {
  const loremipsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(
      " ",
    );

  let result = [];
  let cnt = Math.floor(Math.random() * (max - min)) + min;
  for (let i = 0; i < cnt; i++) {
    result.push(randArr(loremipsum));
  }
  return result.join(" ");
}
