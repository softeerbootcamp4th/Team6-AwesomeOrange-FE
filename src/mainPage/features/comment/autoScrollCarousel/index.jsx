import useAutoCarousel from "./useAutoCarousel.js";

function AutoScrollCarousel({ speed = 1, gap = 0, children }) {
  const { position, ref, eventListener } = useAutoCarousel(speed, gap);

  const flexStyle =
    "min-w-full flex [&>div]:flex-shrink-0 gap-[var(--gap,0)] justify-around items-center absolute";
  return (
    <div className="w-full h-full overflow-hidden" {...eventListener}>
      <div
        style={{
          "--gap": gap + "px",
          transform: `translateX(${position * -1}px)`,
        }}
        className="relative h-max touch-pan-y"
      >
        <div className={`${flexStyle} -translate-x-[calc(100%+var(--gap,0px))]`} aria-hidden="true">
          {children}
        </div>
        <div className={flexStyle} ref={ref}>
          {children}
        </div>
        <div className={`${flexStyle} translate-x-[calc(100%+var(--gap,0px))]`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AutoScrollCarousel;
