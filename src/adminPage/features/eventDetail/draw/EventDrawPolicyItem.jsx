import { POLICY_ENUM } from "@admin/constants.js";

function EventDrawPolicyItem({ action, score }) {
  return (
    <>
      <p className="justify-self-start">{POLICY_ENUM[action]}</p>
      <p>{score}</p>
    </>
  );
}

export default EventDrawPolicyItem;
