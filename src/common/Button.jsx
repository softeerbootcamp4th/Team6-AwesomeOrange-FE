function getButtonStyle(styleType, backdrop, isSubmit) {
  switch(`${backdrop}-${styleType}`) {
  case "light-ghost":
    return `bg-white text-black shadow-[0_0_0_2px_inset_currentColor]
    active:bg-neutral-50 active:text-neutral-400
    hover:bg-neutral-50
    disabled:text-neutral-200 ${isSubmit ? "group-[:invalid]:text-neutral-200" : ""}`;
  case "dark-filled":
    return `bg-white text-black 
    active:bg-blue-800
    hover:bg-blue-400 
    disabled:bg-neutral-500
    ${isSubmit ? "group-[:invalid]:bg-neutral-500" : ""}`;
  case "dark-ghost":
    return `text-white shadow-[0_0_0_2px_inset_currentColor]
    active:text-blue-800
    hover:bg-blue-900 hover:text-blue-400
    disabled:text-neutral-500 ${isSubmit ? "group-[:invalid]:text-neutral-500" : ""}`; 
  case "light-filled": 
  default:
    return `bg-black text-white 
    active:bg-neutral-700 active:text-neutral-200
    hover:bg-neutral-700 
    disabled:bg-neutral-600 disabled:text-neutral-400
    ${isSubmit ? "group-[:invalid]:bg-neutral-600 group-[:invalid]:text-neutral-400" : ""}`;
  }
}

function Button({
  styleType,
  children,
  type = "button",
  backdrop = "light",
  className = "",
  ...otherProps
}) {
  const isSubmit = !(type === "reset" || type === "button");

  const defaultPadding = /([\s:]+p[tblrxyse]?-|^p[tblrxyse]?-)/.test(className) ? "" : "px-6 py-4";
  const defaultStyle = `${defaultPadding} text-body-m font-bold text-center 
	disabled:cursor-default ${isSubmit ? "group-[:invalid]:cursor-default" : ""}`;

  const typedStyle = getButtonStyle(styleType, backdrop, isSubmit);
  return (
    <button
      className={`${defaultStyle} ${typedStyle} ${className}`}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
