import { useContext } from "react";
import AuthFirstSection from "./AuthFirstSection.jsx";
import { ModalCloseContext } from "@/modal/modal.jsx";

function AuthModal()
{
	const close = useContext(ModalCloseContext);

	return <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[40.625rem] p-6 sm:p-10 py-10 shadow bg-white relative flex flex-col gap-14">
		<AuthFirstSection />
		<button className="absolute top-10 right-8" onClick={close} aria-label="닫기">
			<img src="/icons/close.svg" alt="닫기" width="24" height="24" />
		</button>
	</div>
}

export default AuthModal;