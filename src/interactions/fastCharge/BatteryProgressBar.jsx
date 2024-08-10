import style from "./batteryStyle.module.css";

const RED_BAR_SIZE = 50;
const YELLOW_BAR_SIZE = 190;
const MAX_BAR_SIZE = 330;

function getBatteryColor(progress) {
  if (progress <= RED_BAR_SIZE / MAX_BAR_SIZE) return "bg-red-500";
  if (progress <= YELLOW_BAR_SIZE / MAX_BAR_SIZE) return "bg-yellow-400";
  return "bg-blue-400";
}

function BatteryProgressBar({ progress }) {
  const batteryColor = getBatteryColor(progress);
  const batteryDynamicStyle = {
    "--progress": progress,
  };

  return (
    <div className="w-full h-full relative flex" style={batteryDynamicStyle}>
      <div
        className={`${batteryColor} ${style.left} h-full shrink-0 rounded-l-[20px]`}
      ></div>
      <div
        className={`${batteryColor} ${style.bar} h-full shrink-0 relative -left-1`}
      ></div>
      <div
        className={`${batteryColor} ${style.right} h-full shrink-0 relative -left-2 rounded-r-[20px]`}
      ></div>
    </div>
  );
}

export default BatteryProgressBar;
