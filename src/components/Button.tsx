import type { ButtonProps } from "../types/Button";
import getColorBySeverity from "@utils/severities";

function Button({
  label,
  onClick,
  severity = "PRIMARY",
  width,
  fontSize,
  outline = false,
  disabled,
  style,
}: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`p-3 rounded-lg ${
          outline ? "text-black" : "text-white"
        } ${style} ${
          disabled
            ? "cursor-not-allowed brightness-50"
            : "cursor-pointer hover:brightness-75 duration-150"
        }`}
        style={{
          width,
          fontSize,
          backgroundColor: outline
            ? "transparent"
            : getColorBySeverity(severity),
          border: outline
            ? `3px solid ${getColorBySeverity(severity)}`
            : "none",
        }}
      >
        {label}
      </button>
    </>
  );
}

export default Button;
