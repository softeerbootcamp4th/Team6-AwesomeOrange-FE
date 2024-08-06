import Input from "@/common/Input.jsx";

const ONE_MINUTES = 60;

function InputWithTimer({ text, setText, timer, ...otherProps }) {
  const minute = Math.floor(timer / ONE_MINUTES);
  const seconds = timer % ONE_MINUTES;

  return (
    <div className="w-full flex items-center relative">
      <Input text={text} setText={setText} {...otherProps} />
      <span className="absolute text-body-s text-red-400 font-bold right-4">
        {minute}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default InputWithTimer;
