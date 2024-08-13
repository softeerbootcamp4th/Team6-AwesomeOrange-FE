function Checkbox({className, ...otherProps})
{
	const checkboxStyle = `${className} size-4 appearance-none 
	border border-neutral-300 checked:bg-blue-400 checked:border-0 
	checked:bg-checked bg-center bg-cover`;

	return <input type="checkbox" className={checkboxStyle} {...otherProps} />
}

export default Checkbox;