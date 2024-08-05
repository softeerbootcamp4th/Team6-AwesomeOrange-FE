import { useContext } from "react";
import { ModalCloseContext } from "@/modal/modal.jsx";

function AuthModal()
{
	const close = useContext(ModalCloseContext);
	const checkboxStyle = `size-4 appearance-none 
	border border-neutral-300 checked:bg-blue-400 checked:border-0 
	checked:bg-checked bg-center`;

	return <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[40.625rem] p-6 sm:p-10 py-10 shadow bg-white relative flex flex-col gap-14">
		<p className="text-body-l font-bold text-neutral-700">이벤트 응모를 위해<br/>간단한 정보를 입력해주세요!</p>
		<form className="flex flex-col flex-grow relative">
			<div className="flex flex-col gap-6">
				<label className="flex flex-col gap-3">
					<span>이름</span>
					<input type="text" placeholder="ex) 홍길동" />
				</label>
				<label className="flex flex-col gap-3">
					<span>전화번호</span>
					<input placeholder="ex) 01012345678" />
					<p className="w-full h-4">{null}</p>
				</label>
			</div>
			<div className="flex flex-col gap-4 text-detail-l">	
				<label className="flex gap-2 items-center">
					<input type="checkbox" className={checkboxStyle}/>
					<span className="font-bold text-neutral-600">개인정보 수집 동의(필수)</span>
					<span className="font-medium text-neutral-300">자세히 보기</span>
				</label>
				<label className="flex gap-2 items-center">
					<input type="checkbox" className={checkboxStyle}/>
					<span className="font-bold text-neutral-600">마케팅 수신 동의(선택)</span>
					<span className="font-medium text-neutral-300">자세히 보기</span>
				</label>
			</div>
			<div className="w-full flex justify-center absolute bottom-9">
				<button type="submit" className="w-36 h-14 px-6 py-4 text-center bg-black text-white">인증 요청하기</button>
				<button type="button" className="absolute top-[calc(100%+1.25rem)] text-detail-l font-medium text-neutral-300">이미 정보를 입력하신 적이 있으신가요?</button>
			</div>
		</form>
		<button className="absolute top-10 right-8" onClick={close} aria-label="닫기">
			<img src="/icons/close.svg" alt="닫기" width="24" height="24" />
		</button>
	</div>
}

export default AuthModal;