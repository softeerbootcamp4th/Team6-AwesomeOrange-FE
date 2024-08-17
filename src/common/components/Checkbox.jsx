function Checkbox({ className, checked, onChange: userOnChange, defaultChecked, ...otherProps }) {
  const checkboxStyle = `${className} size-4 appearance-none 
	border border-neutral-300 checked:bg-blue-400 checked:border-0 
	checked:bg-checked bg-center bg-cover`;

  function onChange({ target }) {
    userOnChange(target.checked);
  }

  if (checked !== null && checked !== undefined) {
    return (
      <input
        type="checkbox"
        className={checkboxStyle}
        checked={checked}
        onChange={userOnChange != null ? onChange : null}
        {...otherProps}
      />
    );
  }

  return (
    <input
      type="checkbox"
      className={checkboxStyle}
      defaultChecked={checked == null && defaultChecked != null ? defaultChecked : null}
      {...otherProps}
    />
  );
}

export default Checkbox;
