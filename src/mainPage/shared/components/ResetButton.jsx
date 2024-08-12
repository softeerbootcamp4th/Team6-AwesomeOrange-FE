import Button from "@common/components/Button.jsx";
import RefreshIcon from "./assets/refresh.svg?react";

export default function ResetButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      styleType="ghost"
      backdrop="dark"
      className="p-1 xl:p-2"
    >
      <RefreshIcon />
    </Button>
  );
}
