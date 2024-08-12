import Input from "./Input.jsx";

function PhoneInput({ text, setText, ...otherProps }) {
  function addHyphen(value) {
    const plain = value.replace(/\D/g, "");

    if (plain.length < 4) return plain;
    if (plain.length <= 7) return plain.replace(/^(\d{3})(\d{0,4})$/, "$1-$2");
    if (plain.length <= 10)
      return plain.replace(/^(\d{3})(\d{3})(\d{0,4})$/, "$1-$2-$3");
    return plain.replace(/^(\d{3})(\d{4})(\d{4,})$/, "$1-$2-$3");
  }
  return (
    <Input
      text={text}
      setText={(value) => setText(addHyphen(value))}
      placeholder="-를 제외한 숫자를 입력하세요."
      {...otherProps}
      maxLength="13"
    />
  );
}

export default PhoneInput;
