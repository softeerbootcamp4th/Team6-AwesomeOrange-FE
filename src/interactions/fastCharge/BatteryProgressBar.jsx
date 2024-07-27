import style from "./batteryStyle.module.css";

function getBatteryColor(progress)
{
	if(progress <= 50/330) return "bg-red-500";
	if(progress <= 190/330) return "bg-yellow-400";
	return "bg-blue-400";
}

function BatteryProgressBar({progress})
{
	const batteryStaticStyle = "w-full h-full";
	const batteryColor = getBatteryColor(progress);
	const batteryDynamicStyle = {
		"--progress": progress
	};

	return <div className="w-full h-full relative flex" style={batteryDynamicStyle}>
		<div className={`${batteryColor} ${style.left} h-full shrink-0 rounded-l-[20px]`}></div>
		<div className={`${batteryColor} ${style.bar} h-full shrink-0 relative -left-1`}></div>
		<div className={`${batteryColor} ${style.right} h-full shrink-0 relative -left-2 rounded-r-[20px]`}></div>
	</div>
}

export default BatteryProgressBar;