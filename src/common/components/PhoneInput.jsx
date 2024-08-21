import Input from "./Input.jsx";
import { addHyphen } from "../utils.js";

function PhoneInput({ text, setText, ...otherProps }) {
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
