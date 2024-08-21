import style from "./style.module.css";

function Phone({ dynamicStyle, onPointerDown, isSnapped, disabled, $ref }) {
  const staticStyle = `absolute flex justify-center items-center ${style.phone} cursor-pointer touch-none`;
  const phoneScreenFill = isSnapped ? "fill-green-700" : "fill-neutral-900";
  const lightningOpacity = isSnapped ? "opacity-100" : "opacity-0";

  return (
    <div
      className={staticStyle}
      style={dynamicStyle}
      onPointerDown={onPointerDown}
      ref={$ref}
      tabIndex={disabled ? undefined : 0}
    >
      <svg
        className="w-full h-full absolute top-0 left-0"
        width="66"
        height="127"
        viewBox="0 0 63 127"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="-1.5"
          y="1.5"
          width="66"
          height="124"
          rx="10.5"
          fill="#181818"
          stroke="#97E0FF"
          strokeWidth="3"
          className={`${phoneScreenFill} transition-colors`}
        />
        <path
          d="M17 2H45V5C45 6.65685 43.6569 8 42 8H20C18.3431 8 17 6.65685 17 5V2Z"
          fill="#97E0FF"
        />
      </svg>
      <svg
        width="15"
        height="28"
        viewBox="0 0 15 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${lightningOpacity} z-10 transition-colors`}
      >
        <path
          d="M10.6239 13.1582C10.266 12.9321 10.0893 12.5051 10.1826 12.0922L12.5679 1.54338C12.792 0.552496 11.567 -0.102448 10.8675 0.634189L0.838941 11.1938C0.404727 11.651 0.496867 12.391 1.02993 12.7278L4.37611 14.8418C4.734 15.0679 4.91075 15.4949 4.81738 15.9078L2.43207 26.4566C2.20801 27.4475 3.43296 28.1024 4.13255 27.3658L14.1611 16.8062C14.5953 16.349 14.5031 15.609 13.9701 15.2722L10.6239 13.1582Z"
          fill="#BBFBF0"
        />
      </svg>
    </div>
  );
}

export default Phone;
