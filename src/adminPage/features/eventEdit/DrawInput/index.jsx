import DrawSectionTitle from "./DrawSectionTitle.jsx";
import DrawMetadataInput from "./DrawMetadataInput.jsx";
import DrawPolicyInput from "./DrawPolicyInput.jsx";

function DrawInput() {
  return <div className="w-full flex flex-col items-center gap-10">
    <div className="flex flex-col gap-3 w-full max-w-[800px]">
      <DrawSectionTitle>인원수 및 경품 설정</DrawSectionTitle>
      <DrawMetadataInput />
    </div>
    <div className="flex flex-col gap-6 w-full max-w-[800px]">
      <DrawSectionTitle>정책 설정</DrawSectionTitle>
      <DrawPolicyInput />
    </div>
  </div>
}

export default DrawInput;
