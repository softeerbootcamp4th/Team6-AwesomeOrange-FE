import { Input } from "../SmallInput.jsx";
import { formatDate } from "@common/utils.js";
import style from "./style.module.css"

export default function DateTextInput({ date, setDate, isError, className, ...otherProps }) {
  const text = date === null ? "" : formatDate(date, "YYYY-MM-DD");
  const visibleText = date === null ? "-/--" : formatDate(date, "M/DD");
  function onChange(e)
  {
    const value = e.target.value;
    setDate( value === "" ? null : new Date(value) );
  }
  return <div className="w-full h-full relative z-0 border-y-2 border-neutral-400 border-t-transparent hover:border-2 hover:border-t-neutral-400">
    <div className="absolute w-full h-full pointer-events-none top-0 left-0 flex justify-center items-center">{visibleText}</div>
    <input className={style.hiddenDateInput} type="date" value={text} onChange={onChange} {...otherProps} />
  </div>;
}