import { Input } from "./SmallInput.jsx";
import { formatDate } from "@common/utils.js";

export default function DateInput({ date, setDate, isError, className, ...otherProps }) {
  const text = formatDate(date, "YYYY-MM-DD");
  function setText(value)
  {
    setDate( value === "" ? null : new Date(value) );
  }
  return <Input type="date" text={text} setText={setText} {...otherProps} />;
}