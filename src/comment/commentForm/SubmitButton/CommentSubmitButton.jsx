import Button from "@/common/Button.jsx";

function CommentSubmitButtonContent({ resource })
{
	const { submitted } = resource();

	return <Button styleType="filled" type="submit" disabled={submitted}>
		{!submitted ? "기대평 등록" : "오늘의 기대평 등록이 완료되었어요"}
	</Button>
}


export default CommentSubmitButtonContent;