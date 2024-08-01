import JSONData from "./contentList.json";
import ContentSection from "./contentSection";

export default function SimpleInformation() {
  const contentList = JSONData.content;

  return (
    <div className="h-[4700px] flex justify-center ">
      <div className="w-[1200px] flex flex-col gap-[160px]">
        <div className="flex flex-col text-black font-bold pt-[240px]">
          <span className="text-title-m">내가 선택한 단 하나의 전기차</span>

          <span className="text-head-l">The new IONIQ 5</span>
        </div>

        {contentList.map((content, index) => (
          <ContentSection key={index} content={content} />
        ))}
      </div>
    </div>
  );
}
