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
	return <form className="group" onSubmit={onSubmit}>
		<label>
			아이디
			<Input text={id} setText={setId} placeholder="ID를 입력하세요." required maxLength="12" pattern="^[\-\w]+$"/>
		</label>
		<label>
			비밀번호
			<Input text={password} setText={setPassword} type="password" placeholder="비밀번호 입력하세요." required
			minLength="8" maxLength="16" pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
			/>
		</label>
		<Button type="submit">로그인</Button>
	</form>
}

export default LoginSection;