import Checkbox from "@common/components/Checkbox.jsx";

function Filter({ state, dispatch }) {
  function changeFilter(target) {
    return (value) => dispatch({ type: "set_filter", target, value });
  }

  const fieldsetStyle = "border border-neutral-200 rounded px-3 pb-3";
  const labelStyle = "inline-flex items-center gap-1 text-body-s";

  return (
    <div className="grid grid-cols-1 gap-4">
{/*      <fieldset className={fieldsetStyle}>
        <legend className="px-2 text-body-l font-medium">상태</legend>
        <div className="flex flex-wrap gap-2 px-2">
          <label className={labelStyle}>
            <Checkbox name="event-state-scheduled" defaultChecked />
            예정
          </label>
          <label className={labelStyle}>
            <Checkbox name="event-state-ongoing" defaultChecked />
            진행중
          </label>
          <label className={labelStyle}>
            <Checkbox name="event-state-pending-draw" defaultChecked />
            추첨대기
          </label>
          <label className={labelStyle}>
            <Checkbox name="event-state-ended" defaultChecked />
            종료
          </label>
          <label className={labelStyle}>
            <Checkbox name="event-state-temp" defaultChecked />
            임시저장
          </label>
        </div>
      </fieldset>*/}
      <fieldset className={fieldsetStyle}>
        <legend className="px-2 text-body-l font-medium">종류</legend>
        <div className="flex flex-wrap gap-2 px-2">
          <label className={labelStyle}>
            <Checkbox name="event-type-fcfs" checked={state.fcfs} onChange={changeFilter("fcfs")} />
            선착순
          </label>
          <label className={labelStyle}>
            <Checkbox name="event-type-draw" checked={state.draw} onChange={changeFilter("draw")} />
            추첨
          </label>
        </div>
      </fieldset>
    </div>
  );
}

export default Filter;
