import { useState } from "react";
import CommentSuccessModal from "../modals/CommentSuccessModal.jsx";
import CommentNegativeModal from "../modals/CommentNegativeModal.jsx";
import CommentNoUserModal from "../modals/CommentNoUserModal.jsx";
import NoServerModal from "@/common/NoServerModal.jsx";

import Button from "@/common/Button.jsx";
import {fetchServer, handleError} from "@/common/fetchServer.js";
import {EVENT_ID} from "@/common/constants.js";
import openModal from "@/modal/openModal.js";

const submitCommentErrorHandle = {
	400: "negative",
	401: "unauthorized",
	409: "하루에 1번만 기대평을 등록할 수 있습니다.",
	offline: "offline"
};

function CommentForm()
{
	const [errorMessage, setErrorMessage] = useState("");

	const successModal = <CommentSuccessModal />;
	const negativeModal = <CommentNegativeModal />;
	const noUserModal = <CommentNoUserModal />;
	const noServerModal = <NoServerModal />;

	async function onSubmit(e)
	{
		e.preventDefault();
		const commentDom = e.target.elements.comment;
		const content = commentDom.value;
		if(content.length < 10 || content.length > 50) return;

		commentDom.value = "";
		setErrorMessage("");
		try {
			await fetchServer(`/api/v1/comment/${EVENT_ID}`, {
				method: "post",
				body: {content}
			}).catch( handleError(submitCommentErrorHandle) );
			openModal( successModal );
		}
		catch(e) {
			switch( e.message ) {
				case submitCommentErrorHandle[400]: return openModal(negativeModal);
				case submitCommentErrorHandle[401]: return openModal(noUserModal);
				case submitCommentErrorHandle["offline"]: return openModal(noServerModal);
				default: setErrorMessage(e.message);
			}
		}
	}

	return <form className="w-full flex flex-col items-center px-6 gap-15 relative group" onSubmit={onSubmit}>
		<input name="comment" minLength="10" maxLength="50" required
		className="w-full max-w-[1200px] h-20 px-3 py-6 placeholder:text-neutral-200 placeholder-shown:text-neutral-200 focus:outline-0 focus:bg-neutral-50 text-black text-body-l font-medium border-b-[3px] border-current" placeholder="최소 10, 최대 50자까지 입력해주세요." />
		<Button styleType="filled" type="submit">기대평 등록</Button>
		<p className="absolute -bottom-6 text-detail-l font-bold text-red-400">{errorMessage}</p>
	</form>
}

export default CommentForm;