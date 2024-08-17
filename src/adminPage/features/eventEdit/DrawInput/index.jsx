import DrawSectionTitle from "./DrawSectionTitle.jsx";
import DrawMetadataInput from "./DrawMetadataInput.jsx";

function DrawInput() {
  return <div className="w-full flex flex-col items-center gap-8">
    <div className="flex flex-col gap-4 w-full max-w-[800px]">
      <DrawSectionTitle>인원수 및 경품 설정</DrawSectionTitle>
      <DrawMetadataInput />
    </div>
    <div className="flex flex-col gap-4 w-full max-w-[800px]">
      <DrawSectionTitle>정책 설정</DrawSectionTitle>
      <div>
        <div className="grid grid-cols-[3fr_1fr] font-bold">
          <div className="text-center">액션</div>
          <div className="text-center">배율</div>
        </div>
        <div className="grid grid-cols-[3fr_1fr] font-bold">
          <div className="text-center">1등</div>
          <div className="text-center">명</div>
        </div>
        <button>추가하기</button>
      </div>
    </div>
  </div>
}

export default DrawInput;
