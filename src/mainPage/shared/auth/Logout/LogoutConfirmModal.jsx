import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";

import { logout } from "@main/auth/store.js";

function LogoutConfirmModal({onLogout})
{
	const close = useContext(ModalCloseContext);
	function clickLogout()
	{
		logout();
	}

	return <AlertModalContainer title="정말로 로그아웃하시겠습니까?">
		<div className="w-full flex flex-wrap justify-center gap-5">
			<Button styleType="ghost" onClick={clickLogout}>
				로그아웃
			</Button>
			<Button styleType="filled" onClick={close}>
				닫기
			</Button>
		</div>
	</AlertModalContainer>
}

export default LogoutConfirmModal;