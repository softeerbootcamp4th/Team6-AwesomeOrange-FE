const inputboxStyle = `p-3 py-1 bg-neutral-50 border-2 border-neutral-400 outline-0 rounded text-body-m font-medium
focus:bg-white focus:border-neutral-800 
disabled:bg-neutral-100
placeholder:text-neutral-400`;

const errorStyle = `bg-white border-red-500 focus:border-red-500`;

const errorInputStyle = `invalid:border-red-500
invalid:focus:border-red-500`;

export function Input({ text, setText, isError, className, ...otherProps }) {
  return (
    <input
      className={`${inputboxStyle} ${isError ? errorStyle : ""} ${/^\s*$/.test(text) ? "" : errorInputStyle} ${className ?? ""}`}
      type="text"
      value={text}
      onChange={(e) => setText?.(e.target.value)}
      {...otherProps}
    />
  );
}

export function TextBox({ text, setText, isError, className, ...otherProps }) {
  return (
    <textarea
      className={`${inputboxStyle} ${isError ? errorStyle : ""} ${/^\s*$/.test(text) ? "" : errorInputStyle} ${className ?? ""}`}
      value={text}
      onChange={(e) => setText?.(e.target.value)}
      {...otherProps}
    />
  );
}
