import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "./store.js";
import { fetchServer, handleError } from "@common/dataFetch/fetchServer.js";
import Input from "@common/components/Input.jsx";
import Button from "@common/components/Button.jsx";

const loginErrorHandler = {
  400: "잘못된 입력입니다!",
  401: "로그인에 실패했습니다!",
};

function LoginSection() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const config = { method: "post", body: { userName: id, password } };
    setErrorMessage("");
    fetchServer("/api/v1/admin/auth/signin", config)
      .then(({ token }) => {
        login(token);
        navigate("/events", { replace: true });
      })
      .catch(handleError(loginErrorHandler))
      .catch((e) => {
        setId("");
        setPassword("");
        setErrorMessage(e.message);
      });
  }
  return (
    <form
      className="w-full h-full max-w-[32rem] max-h-[40rem] p-8 flex flex-col gap-8 bg-white shadow-md rounded-3xl group"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4">
        <label>
          <span className="text-detail-l text-neutral-600">아이디</span>
          <Input
            text={id}
            setText={setId}
            placeholder="ID를 입력하세요."
            required
            maxLength="12"
            pattern="^[\-\w]+$"
          />
        </label>
        <label>
          <span className="text-detail-l text-neutral-600">비밀번호</span>
          <Input
            text={password}
            setText={setPassword}
            type="password"
            placeholder="비밀번호 입력하세요."
            required
            minLength="8"
            maxLength="16"
            pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
          />
        </label>
      </div>
      <div className="flex flex-col relative items-center">
        <Button className="w-full" type="submit">
          로그인
        </Button>
        <span className="absolute -bottom-4 text-detail-l text-red-400">
          {errorMessage}
        </span>
      </div>
    </form>
  );
}

export default LoginSection;
