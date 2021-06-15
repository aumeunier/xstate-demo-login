import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  isPassword?: boolean;
  additionalClasses: string;
  onChange: (value: string) => void;
}
export const FormInput = (props: FormInputProps) => (
  <div>
    <label htmlFor={props.id} className="sr-only">
      {props.label}
    </label>
    <input
      id={props.id}
      name={props.label}
      type={props.isPassword ? "password" : "email"}
      required
      autoComplete="off"
      className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${props.additionalClasses}`}
      placeholder={props.label}
      onChange={(e) => props.onChange(e.target.value)}
    />
  </div>
);
