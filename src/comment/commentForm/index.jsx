import Button from "@/common/Button.jsx";

function CommentForm()
{
	return <form className="w-full flex flex-col items-center px-6 gap-15">
		<input className="w-full max-w-[1200px] h-20 px-3 py-6 placeholder:text-neutral-200 placeholder-shown:text-neutral-200 focus:outline-0 focus:bg-neutral-50 text-black text-body-l font-medium border-b-[3px] border-current" placeholder="최소 20, 최대 100자까지 입력해주세요." />
		<Button styleType="filled" type="submit">기대평 등록</Button>
	</form>
}

export default CommentForm;