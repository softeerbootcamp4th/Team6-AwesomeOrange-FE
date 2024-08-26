import { useRef } from "react";
import Input from "./Input.jsx";
import { addHyphen } from "../utils.js";

function PhoneInput({ text, setText, ...otherProps }) {
  const isComposing = useRef(0);

  return (
    <Input
      type="tel"
      text={text}
      setText={(value) => {
        if (isComposing.current >= 1) {
          isComposing.current = (isComposing.current + 1) % 3;
          return;
        }
        setText(addHyphen(value));
      }}
      onCompositionStart={() => {
        isComposing.current = 1;
      }}
      onCompositionEnd={(e) => {
        isComposing.current = 0;
        setText(addHyphen(e.target.value));
      }}
      placeholder="-를 제외한 숫자를 입력하세요."
      {...otherProps}
      maxLength="13"
    />
  );
}

export default PhoneInput;
