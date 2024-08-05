function Button({styleType, children, type="button", className, ...otherProps})
{
	const isSubmit = !(type === "reset" || type === "button");

	const filledStyle = `bg-black text-white active:bg-neutral-700 active:text-neutral-200
	hover:bg-neutral-700 disabled:bg-neutral-600 disabled:text-neutral-400
	${isSubmit ? "group-[:invalid]:bg-neutral-600 group-[:invalid]:text-neutral-400" : ""}`;

	const ghostStyle = `bg-white text-black shadow-[0_0_0_2px_inset_currentColor]
	active:bg-neutral-50 active:text-neutral-400 hover:bg-neutral-50
	disabled:text-neutral-200 ${isSubmit ? "group-[:invalid]:text-neutral-200" : ""}`;

	const defaultStyle = `px-6 py-4 text-body-m font-bold text-center 
	disabled:cursor-default ${isSubmit ? "group-[:invalid]:cursor-default" : ""}`;

	const typedStyle = styleType === "filled" ? filledStyle : ghostStyle;
	return <button className={`${defaultStyle} ${typedStyle} ${className}`} type={type} {...otherProps}>{children}</button>
}

export default Button;