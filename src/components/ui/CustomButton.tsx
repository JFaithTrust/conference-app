import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  label: ReactNode | string;
  disabled?: boolean;
  editable?: boolean;
  mainable?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outlined?: boolean;
  notOulined?: boolean;
  classNames?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const CustomButton = ({
  notOulined,
  label,
  editable,
  mainable,
  success,
  warning,
  danger,
  outlined,
  disabled,
  classNames,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center font-medium overflow-hidden transition disabled:opacity-70 disabled:cursor-not-allowed",
        mainable &&
          outlined &&
          "text-mainindigo bg-white border-[2px] border-solid border-mainindigo hover:text-white hover:bg-mainindigo",
        mainable &&
          notOulined &&
          "text-white bg-mainindigo border-[2px] border-solid border-mainindigo hover:text-mainindigo hover:bg-white",
        mainable &&
          !notOulined &&
          !outlined &&
          "text-white border-none bg-mainindigo hover:bg-mainindigo/95",
        editable && "text-white border-none bg-typeblue hover:bg-typeblue/95",
        success && "text-white border-none bg-typegreen hover:bg-typegreen/95",
        warning &&
          "text-white border-none bg-typeyellow hover:bg-typeyellow/95",
        danger && "text-white border-none bg-typered hover:bg-typered/95",
        classNames
      )}
    >
      {label}
    </button>
  );
};

export default CustomButton;
