function Button({styleType, children, className, ...otherProps})
{
	const filledStyle = `bg-black text-white active:bg-neutral-700 active:text-neutral-200
	hover:bg-neutral-700 disabled:bg-neutral-600 disabled:text-neutral-400
	group-[:invalid]:bg-neutral-600 group-[:invalid]:text-neutral-400`;

	const ghostStyle = `bg-white text-black shadow-[0_0_0_2px_inset_currentColor]
	active:bg-neutral-50 active:text-neutral-400 hover:bg-neutral-50
	disabled:text-neutral-200 group-[:invalid]:text-neutral-200`;

	const defaultStyle = `px-6 py-4 text-body-m font-bold text-center disabled:pointer-events-none group-[:invalid]:pointer-events-none`;
	const typedStyle = styleType === "filled" ? filledStyle : ghostStyle;
	return <button className={`${defaultStyle} ${typedStyle} ${className}`} {...otherProps}>{children}</button>
}

export default Button;