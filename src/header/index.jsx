export default function Header(){
  return (
    <div className="h-[60px] backdrop-blur-xl flex justify-between items-center pl-[36px] pr-[46px] font-bold">
      <span className="text-black text-[22px]">
        The new IONIQ 5
      </span>

      <div className="flex gap-8 text-[16px] text-neutral-300">
        <span>
          추첨 이벤트
        </span>

        <span>
          차량상세정보
        </span>

        <span>
          기대평
        </span>

        <span>
          선착순 이벤트
        </span>
      </div>

      <button className="bg-blue-400 text-white text-[14px] py-[12px] px-[16px]">
        본인인증하기
      </button>
    </div>
  );
}