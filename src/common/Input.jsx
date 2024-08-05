function Input({text, setText, placeholder, isError})
{
	const inputboxStyle = `w-full h-14 p-4 bg-neutral-50 rounded text-body-m font-medium
	focus:bg-white focus:outline-neutral-800
	placeholder:text-neutral-200`;

	const errorStyle = `bg-white outline-red-500 focus:outline-red-500`;

	return <input className={`${inputboxStyle} ${isError ? errorStyle : ""}`} 
	type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder={placeholder} />
}

export default Input;