import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";

function LogoutAlertModal({onLogout})
{
	const close = useContext(ModalCloseContext);
	function onClick()
	{
		onLogout?.();
		close();
	}

	return <AlertModalContainer title="성공적으로 로그아웃되었습니다." description="다음에 또 오세요!">
		<div className="w-full flex flex-wrap justify-center gap-5">
			<Button styleType="ghost" onClick={onClick}>
				닫기
			</Button>
		</div>
	</AlertModalContainer>
}

export default LogoutAlertModal;