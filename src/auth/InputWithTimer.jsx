import Input from "@/common/Input.jsx";

function InputWithTimer({ text, setText, timer, ...otherProps }) {
  return (
    <div className="w-full flex items-center relative">
      <Input text={text} setText={setText} {...otherProps} />
      <span className="absolute text-body-s text-red-400 font-bold right-4">
        {timer}
      </span>
    </div>
  );
}

export default InputWithTimer;
