import _ from "lodash";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import { FormCheckbox } from "../../components/FormCheckbox";
import { FormInput } from "../../components/FormInput";
import { LoginHeader } from "../../components/LoginHeader";

export const LoginPage = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginIsValid = (): boolean => !_.isEmpty(login);
  const passwordIsValid = (): boolean => !!(password && password.length > 6);
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
              onChange={(v) => setLogin(v)}
            />
            <FormInput
              isPassword
              label="Password"
              id="password"
              additionalClasses="rounded-b-md"
              onChange={(v) => setPassword(v)}
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
            <Button
              onClick={() => {}}
              disabled={!(loginIsValid() && passwordIsValid())}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
