import React from "react";
import { FormCheckbox } from "./components/FormCheckbox";
import { FormInput } from "./components/FormInput";
import { LockIcon } from "./components/Icons";
import { LoginHeader } from "./LoginHeader";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginHeader />
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <FormInput
              label="Email"
              id="email-address"
              additionalClasses="rounded-t-md"
            />
            <FormInput
              isPassword
              label="Password"
              id="password"
              additionalClasses="rounded-b-md"
            />
          </div>

          <div className="flex items-center justify-between">
            <FormCheckbox id="remember-me" label="Remember me" />

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <LockIcon />
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
