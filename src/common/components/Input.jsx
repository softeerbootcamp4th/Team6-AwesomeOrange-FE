function Input({ text, setText, isError, ...otherProps }) {
  const inputboxStyle = `w-full h-14 p-4 bg-neutral-50 rounded text-body-m font-medium
	focus:bg-white focus:outline-neutral-800 
	placeholder:text-neutral-200`;

  const errorStyle = `bg-white outline outline-red-500 focus:outline-red-500`;

  const errorInputStyle = `invalid:outline invalid:outline-red-500
	invalid:focus:outline invalid:focus:outline-red-500`;

  return (
    <input
      className={`${inputboxStyle} ${isError ? errorStyle : ""} ${/^\s*$/.test(text) ? "" : errorInputStyle}`}
      type="text"
      value={text}
      onChange={(e) => setText?.(e.target.value)}
      {...otherProps}
    />
  );
}

export default Input;
