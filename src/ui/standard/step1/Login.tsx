import _ from "lodash";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/FormInput";
import { LoginHeader } from "../../components/LoginHeader";
import { OtherActions } from "../../components/OtherActions";

export const LoginPage = () => {
  // We need some state to keep the values of the inputs
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Some logic to determine whether the login/pwd are in an acceptable range
  const loginIsValid = (): boolean => !_.isEmpty(login);
  const passwordIsValid = (): boolean => !!(password && password.length > 6);
  
  // Validation event is declared here
  const validateAuthentication = async () => {
    console.debug(`Authenticating with: ${login}, ${password}`)
    // We would probably have some service call logic handled in another file here
    await new Promise(res => setTimeout(res, 2000));
    return Promise.resolve(true);
  }

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
              onChange={(v) => 
                // We update the state on a User event
                setLogin(v)
              }
            />
            <FormInput
              isPassword
              label="Password"
              id="password"
              additionalClasses="rounded-b-md"
              onChange={(v) => setPassword(v)}
            />
          </div>

          <OtherActions />
          <Button
            // We call our component's function
            onClick={validateAuthentication}
            // UI is function of our component's state
            disabled={!(loginIsValid() && passwordIsValid())}
            text="Log in"
          />
        </div>
      </div>
    </div>
  );
};
