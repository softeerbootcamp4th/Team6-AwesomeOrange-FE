import ascArrow from "../assets/upArrow.svg";
import descArrow from "../assets/downArrow.svg";

function TableSorter({ className, children, state, setState }) {
  function onClick() {
    if (state === "asc") return setState("desc");
    if (state === "desc") return setState("none");
    return setState("asc");
  }
  return (
    <button
      className={`${className ?? ""} active:text-neutral-600 flex justify-center items-center`}
      onClick={onClick}
    >
      {children}
      {state !== "none" && (
        <img
          src={state === "desc" ? descArrow : ascArrow}
          className="size-4"
          alt={state === "desc" ? "내림차순정렬" : "오름차순정렬"}
          draggable="false"
        />
      )}
    </button>
  );
}

export default TableSorter;
