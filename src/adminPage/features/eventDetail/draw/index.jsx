import EventDrawMetadataItem from "./EventDrawMetadataItem.jsx";
import EventDrawPolicyItem from "./EventDrawPolicyItem.jsx";
import tableStyle from "../tableStyle.js";

function EventDrawDataRenderer({ data }) {
  const gridCommonStyle = "grid px-2 gap-4 justify-items-center";
  const metadataGridStyle = `${gridCommonStyle} grid-cols-[3rem_6rem_1fr]`;
  const policyGridStyle = `${gridCommonStyle} grid-cols-[3fr_1fr]`;
  const headerStyle = `h-10 bg-neutral-50 rounded-lg text-black items-center font-bold text-center 
	*:relative *:w-full *:after:h-full *:after:absolute *:after:-right-2 *:after:border-r *:after:border-neutral-200`;
  const titleStyle = "text-center font-bold self-start h-10 flex justify-center items-center";
  return (
    <>
      <section className={`${tableStyle} gap-y-6`}>
        <p className={titleStyle}>당첨 인원수</p>
        <div className="flex flex-col gap-2">
          <div className={`${metadataGridStyle} ${headerStyle}`}>
            <p>등수</p>
            <p>인원 수</p>
            <p className="last:after:border-r-0">경품</p>
          </div>
          <div className={`${metadataGridStyle} gap-y-2 font-regular`}>
            {data.metadata.map((data) => (
              <EventDrawMetadataItem key={data.id} {...data} />
            ))}
          </div>
        </div>
        <p className={titleStyle}>점수 정책</p>
        <div className="flex flex-col gap-2">
          <div className={`${policyGridStyle} ${headerStyle}`}>
            <p>액션</p>
            <p className="last:after:border-r-0">배율</p>
          </div>
          <div className={`${policyGridStyle} gap-y-2 font-regular`}>
            {data.policies.map((data) => (
              <EventDrawPolicyItem key={data.id} {...data} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default EventDrawDataRenderer;
