import Star from "./assets/star.svg?react";

export default function GiftDetail({ contentList }) {
  return (
    <div className="flex flex-col font-bold">
      {contentList.map((content, index) => (
        <div key={index} className="bg-neutral-900 p-6 mb-5 flex z-0 relative">
          <img src={content.src} alt="경품" />

          <div className="pl-8 flex flex-col">
            <span className="text-body-m sm:text-body-l text-white">
              {content.name}
              <span className="text-blue-400 pl-2">{content.num}명</span>
            </span>

            <span className="pt-2 text-body-s sm:text-body-m text-neutral-400 whitespace-pre-wrap">
              {content.desc}
            </span>
          </div>

          <div className="absolute right-0 top-0 z-40 translate-x-1/4 -translate-y-1/4">
            <Star fill={content.starColor} />

            <span
              style={{ color: content.starTextColor }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-body-s"
            >
              {content.star}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
