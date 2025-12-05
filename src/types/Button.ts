import type { SeveritiesOptions } from "./severities";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  severity?: SeveritiesOptions;
  outline?: boolean;
  disabled?: boolean;
  width?: string;
  fontSize?: string;
  style?: string;
}
