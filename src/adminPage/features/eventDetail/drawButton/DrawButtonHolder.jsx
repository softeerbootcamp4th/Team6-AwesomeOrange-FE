import useServerTimeStore from "@admin/serverTime/store.js";
import DrawButton from "./DrawButton.jsx";

function DrawButtonHolder({ endTime }) {
  const getServerTime = useServerTimeStore((store) => store.getData);
  const serverTime = getServerTime();

  if (new Date(endTime) < serverTime) return <DrawButton />;
  return null;
}

export default DrawButtonHolder;
