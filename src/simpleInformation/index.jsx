import JSONData from "./contentList.json";
import ContentSection from "./contentSection";

export default function SimpleInformation() {
  const contentList = JSONData.content;

  return (
    <div className="w-full p-6 flex justify-center ">
      <div className="w-full max-w-[1200px] flex flex-col gap-20 md:gap-30 lg:gap-40">
        <div className="flex flex-col text-black font-bold pt-[240px]">
          <span className="text-title-s md:text-title-m">내가 선택한 단 하나의 전기차</span>

          <span className="text-head-l">The new IONIQ 5</span>
        </div>

        {contentList.map((content, index) => (
          <ContentSection key={index} content={content} />
        ))}
      </div>
    </div>
  );
}
