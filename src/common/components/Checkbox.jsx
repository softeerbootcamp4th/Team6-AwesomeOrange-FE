function Checkbox({className, onChange: userOnChange, ...otherProps})
{
	const checkboxStyle = `${className} size-4 appearance-none 
	border border-neutral-300 checked:bg-blue-400 checked:border-0 
	checked:bg-checked bg-center bg-cover`;

	function onChange({target})
	{
		userOnChange(target.checked);
	}

	return <input type="checkbox" className={checkboxStyle} onChange={ userOnChange != null ? onChange : null } {...otherProps} />
}

export default Checkbox;