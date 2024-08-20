import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import openModal from "@common/modal/openModal.js";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";

import { logout } from "@main/auth/store.js";
import LogoutAlertModal from "./LogoutAlertModal.jsx";

function LogoutConfirmModal({onLogout})
{
	const close = useContext(ModalCloseContext);
	function clickLogout()
	{
		logout();
		onLogout?.();
		openModal(<LogoutAlertModal />);
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