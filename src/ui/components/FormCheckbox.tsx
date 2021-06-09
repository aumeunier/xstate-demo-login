import React from "react";

interface FormCheckboxProps {
  id: string;
  label: string;
}
export const FormCheckbox = (props: FormCheckboxProps) => (
  <div className="flex items-center">
    <input
      id={props.id}
      name={props.label}
      type="checkbox"
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label htmlFor={props.id} className="ml-2 block text-sm text-gray-900">
      {props.label}
    </label>
  </div>
);
