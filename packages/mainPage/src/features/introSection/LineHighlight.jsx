import style from "./index.module.css";

function LineHighlight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={style.openVector}
      width="808"
      height="47"
      viewBox="0 0 808 47"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10.3035 36.014C16.8072 35.8761 23.0392 35.0956 29.423 34.3444C72.8649 29.233 116.318 24.8301 160.561 23.0018C202.39 21.2733 244.061 18.73 285.855 16.7248C336.338 14.3026 386.656 13.6948 437.181 13.2858C481.317 12.9285 525.453 11.411 569.59 10.8226C612.985 10.2441 656.203 10.6204 699.472 11.6882C724.41 12.3037 748.936 14.2539 773.784 15.1688C781.807 15.4642 789.751 16.3816 797.831 16.2103"
        stroke="url(#paint0_linear_4220_1683)"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4220_1683"
          x1="10.1518"
          y1="28.8581"
          x2="797.745"
          y2="12.1558"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3ED7BE" />
          <stop offset="1" stopColor="#069AF8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default LineHighlight;
