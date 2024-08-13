import { useState } from "react";

import Input from "@common/components/Input.jsx";
import Button from "@common/components/Button.jsx";

function LoginSection()
{
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	function onSubmit(e)
	{
		e.preventDefault();
	}
	return <form className="w-full h-full max-w-[32rem] max-h-[20rem] p-8 flex flex-col gap-8 bg-white shadow-md rounded-3xl group" onSubmit={onSubmit}>
		<div className="flex flex-col gap-4">
			<label>
				<span className="text-detail-l text-neutral-600">아이디</span>
				<Input text={id} setText={setId} placeholder="ID를 입력하세요." required maxLength="12" pattern="^[\-\w]+$"/>
			</label>
			<label>
				<span className="text-detail-l text-neutral-600">비밀번호</span>
				<Input text={password} setText={setPassword} type="password" placeholder="비밀번호 입력하세요." required
				minLength="8" maxLength="16" pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
				/>
			</label>
		</div>
		<Button type="submit">로그인</Button>
	</form>
}

export default LoginSection;