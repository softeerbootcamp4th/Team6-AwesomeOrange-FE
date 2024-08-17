import CloseIcon from "./close.svg?react";

function DeleteButton({onClick, disabled})
{
	return <button
		className="flex justify-center items-center text-red-500 hover:scale-110 active:scale-90 transition-transform disabled:text-neutral-400 disabled:hover:scale-100"
		onClick={onClick}
		aria-label="삭제"
		disabled={disabled}
		type="button"
	>
		<CloseIcon />
	</button>
}

export default DeleteButton;