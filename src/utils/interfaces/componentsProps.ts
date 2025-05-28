export interface SimpleButtonProps {
  backgroundColor: string;
  fontColor?: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface PageButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
  color: string;
}

export type BaloonProps =
  | { side: "left" | "right"; imgSrc: string; icon?: never }
  | { side: "left" | "right"; icon: React.ReactNode; imgSrc?: never };

export interface ColoredTextInputProps {
  borderColor?: string;
  placeholder?: string;
  label?: string;
  value: string;
  setValue: (value: string) => void;
  icon?: React.ReactNode;
  password?: boolean;
}

export interface SimpleTextInputProps {
  borderColor?: string;
  backgroundColor?: string;
  fontColor?: string;
  fontSize?: string;
  fontWeight?: string | number;
  inputHeight?: string;
  inputWidth?: string;
  placeholder?: string;
  label?: string;
  value: string | null | undefined;
  setValue: (value: string) => void;
  readonly?: boolean;
  icon?: React.ReactNode;
  onClickIcon?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  textAlign?: "left" | "center" | "right";
  disabled?: boolean;
}

export interface AddButtonProps {
  onClick: () => void;
  backgroundColor?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  iconColor?: string;
  iconWidth?: string;
  iconHeight?: string;
}

export interface SimpleFieldProps {
  boxWidth?: string;
  labelFontSize?: string;
  labelFontWeight?: string;
  labelText: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  inputHeight?: string;
  inputFontSize?: string;
  borderColor?: string;
  placeholder?: string;
  readonly?: boolean;
}

export interface InputWithSelectorProps {
  selectedUnit?: Option
  textValue?: string
  onUnitChange?: (unit: Option) => void
  onTextChange?: (value: string) => void
  options?: Option[]
  placeholder?: string
  disabled?: boolean
  fullWidth?: boolean
}

export interface SnackBarProps {
  severity: "error" | "success" | "info" | "warning";
  message: string;
}

export type Option = {
  value: string // Texto completo
  label: string // Abreviación
}
