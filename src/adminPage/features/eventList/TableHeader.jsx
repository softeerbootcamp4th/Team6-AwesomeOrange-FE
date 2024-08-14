import tableTemplateCol from "./tableStyle.js";
import TableSorter from "./TableSorter.jsx";

const headerData = [
  { key: "eventId", name: "ID" },
  { key: "name", name: "이벤트 명" },
  { key: "startTime", name: "이벤트 오픈시간" },
  { key: "endTime", name: "이벤트 종료시간" },
  { key: "eventType", name: "종류" },
];

function TableHeader({ state, dispatch, resetCheck }) {
  function changeSort(target) {
    return (value) => dispatch({ type: "set_sort", target, value });
  }

  return (
    <div
      className={`${tableTemplateCol} w-full h-12 py-2 bg-neutral-50 rounded-lg text-black`}
    >
      <div className="border-r border-neutral-200 flex justify-center items-center" onClick={resetCheck}>
        선택
      </div>
      {headerData.map(({ key, name }) => (
        <TableSorter
          key={key}
          className="border-r border-neutral-200"
          state={state[key]}
          setState={changeSort(key)}
        >
          {name}
        </TableSorter>
      ))}
      <div className="border-r border-neutral-200 flex justify-center items-center">
        상태
      </div>
      <div className="flex justify-center items-center">상세</div>
    </div>
  );
}

export default TableHeader;
