import { useState } from "react";
import Input from "@/common/Input.jsx";
import Button from "@/common/Button.jsx";

function AuthSecondSection({name, phone})
{
	const [ authNumber, setAuthNumber ] = useState("");

	const josa = "013678".includes(phone[phone.length - 1]) ? "으" : "";
	return  <>
		<p className="text-body-l font-bold text-neutral-700">{phone}{josa}로<br/>인증번호를 전송했어요.</p>
		<form className="flex flex-col flex-grow w-full relative pb-4 group">
			<div className="flex flex-col flex-grow justify-center items-center gap-7 px-0.5 relative h-0 overflow-y-auto">
				<Input text={authNumber} setText={setAuthNumber} placeholder="인증번호를 입력해주세요" required/>
			</div>
			<div className="w-full flex justify-center gap-5 relative">
				<Button styleType="filled" type="submit" className="w-36 min-h-14">인증 완료하기</Button>
				<Button styleType="ghost" type="button" className="min-h-14">재전송</Button>
			</div>
		</form>
	</>
}

export default AuthSecondSection;