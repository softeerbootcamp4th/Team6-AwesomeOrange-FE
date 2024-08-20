import Button from "@common/components/Button.jsx";
import RefreshIcon from "./refresh.svg?react";

export default function ResetButton({ onClick, disabled }) {
  return (
    <Button
      onClick={onClick}
      styleType="ghost"
      backdrop="dark"
      aria-label="refresh"
      className="p-1 xl:p-2"
      disabled={disabled}
    >
      <RefreshIcon />
    </Button>
  );
}
