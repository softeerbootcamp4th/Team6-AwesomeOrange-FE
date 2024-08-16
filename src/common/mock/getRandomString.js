export default function getRandomString(len) {
  /* 한글
  const startCode = 0xac00;
  const endCode = 0xd7a3;
  */
  const startCode = 0x0750;
  const endCode = 0x077f;

  let str = "";
  for (let i = 0; i < len; i++) {
    const randomCode =
      Math.floor(Math.random() * (endCode - startCode + 1)) + startCode;
    str += String.fromCharCode(randomCode);
  }

  return str;
}