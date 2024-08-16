import { useState } from "react";
import { Input } from "@admin/components/SmallInput.jsx";
import Checkbox from "@common/components/Checkbox.jsx";

function FcfsInput() {
  const [isOpenTimeBatch, SetOpenTimeBatch] = useState(false);
  const [isCloseTimeBatch, SetCloseTimeBatch] = useState(false);

  return <div>
    <div>
      <label>
        <Checkbox checked={isOpenTimeBatch} onChange={SetOpenTimeBatch}/>
        오픈시간 일괄 설정
        <Input type="time" disabled={!isOpenTimeBatch}/>
      </label>
      <label>
        <Checkbox checked={isCloseTimeBatch} onChange={SetCloseTimeBatch}/>
        종료 시간 일괄 설정
        <Input type="time" disabled={!isCloseTimeBatch}/>
      </label>
      <button>자동 채우기</button>
    </div>
    <div>
      {}
    </div>
  </div>;
}

export default FcfsInput;
