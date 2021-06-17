import cn from "classnames";
import React from "react";
import { LockIcon } from "./Icons";

interface ButtonProps {
  disabled?: boolean;
  text: string;
  color?: string;
  onClick: () => void;
}
export const Button = (props: ButtonProps) => (
  <button
    onClick={props.onClick}
    className={cn(
      "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none",
      {
        "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500":
          !props.disabled && props.color === undefined,
        "bg-gray-600": props.disabled,
        "cursor-not-allowed": props.disabled, 
        [props.color ?? ""]: props.color,
      }
    )}
  >
    <LockIcon disabled={props.disabled} />
    {props.text}
  </button>
);
