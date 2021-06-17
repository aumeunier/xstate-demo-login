import React from "react";
import { FormCheckbox } from "./FormCheckbox";

export const OtherActions = () => (
  <div className="flex items-center justify-between">
    <FormCheckbox id="remember-me" label="Remember me" />

    <div className="text-sm">
      <span className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
        Forgot your password?
      </span>
    </div>
  </div>
);
