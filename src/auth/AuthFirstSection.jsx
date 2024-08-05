import Input from "@/common/Input.jsx";
import PhoneInput from "@/common/PhoneInput.jsx";

function AuthFirstSection({name, setName, phone, setPhone})
{
	const checkboxStyle = `size-4 appearance-none 
	border border-neutral-300 checked:bg-blue-400 checked:border-0 
	checked:bg-checked bg-center`;

	return <>
		<p className="text-body-l font-bold text-neutral-700">이벤트 응모를 위해<br/>간단한 정보를 입력해주세요!</p>
		<form className="flex flex-col flex-grow w-[calc(100%+0.25rem)] -left-0.5 relative pb-4">
			<div className="flex flex-col flex-grow px-0.5 relative h-0 overflow-y-auto">
				<div className="flex flex-col gap-6">
					<label className="flex flex-col gap-3">
						<span className="text-body-m font-bold">이름</span>
						<Input text={name} setText={setName} placeholder="ex) 홍길동" required minLength="2"/>
					</label>
					<label className="flex flex-col gap-3">
						<span className="text-body-m font-bold">전화번호</span>
						<PhoneInput text={phone} setText={setPhone} required/>
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
			</div>
			<div className="w-full flex justify-center relative">
				<button type="submit" className="w-36 min-h-14 px-6 py-4 text-center bg-black text-white">인증 요청하기</button>
				<button type="button" className="absolute top-[calc(100%+1.25rem)] text-detail-l font-medium text-neutral-300">이미 정보를 입력하신 적이 있으신가요?</button>
			</div>
		</form>
	</>
}

export default AuthFirstSection;