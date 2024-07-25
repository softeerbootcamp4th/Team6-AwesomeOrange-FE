import useScrollTransition from "@/common/useScrollTransition.js";

function IntroSection() {
  const titleOpacity = useScrollTransition({
    scrollStart: 0,
    scrollEnd: 500,
    valueStart: 1,
    valueEnd: 0,
  });

  const titleStyle = {
    opacity: titleOpacity,
  };

  return (
    <div className="h-[2160px]">
      <h1
        className="text-8xl w-full flex items-center justify-center absolute top-[500px]"
        style={titleStyle}
      >
        The new IONIQ 5
      </h1>
    </div>
  );
}

export default IntroSection;
