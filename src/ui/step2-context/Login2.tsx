import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import { LoginHeader } from "../components/LoginHeader";
import { OtherActions } from "../components/OtherActions";

export const LoginV2 = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValidLogin, setIsValidLogin] = useState<boolean>(false);
  // Let's start the boolean dance :(
  const [canValidate, setCanValidate] = useState<boolean>(false);
  const [isValidPwd, setIsValidPwd] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const validateAuthentication = async () => {
    console.debug(`Authenticating with: ${login}, ${password}`);
    // We would probably have some service call logic handled in another file here
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 2000));
    const res = login === "mylogin" && password === "mypassword";
    setIsSubmitting(false);
    if (res) setIsDone(true);
    return res;
  };

  // We also probably need to declare side effects when our values change
  useEffect(() => {
    const loginIsValid = !_.isEmpty(login);
    const passwordIsValid = !!(password && password.length > 6);
    setIsValidLogin(loginIsValid);
    setIsValidPwd(passwordIsValid);
    setCanValidate(loginIsValid && passwordIsValid);
  }, [login, password]);

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
              isInvalid={isValidLogin}
              disabled={isSubmitting}
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
              isInvalid={isValidPwd}
              disabled={isSubmitting}
              onChange={(v) => setPassword(v)}
            />
          </div>

          <OtherActions />
          <Button
            // We call our component's function
            onClick={validateAuthentication}
            // UI is function of our component's state
            disabled={!canValidate}
            text={
              isDone
                ? "Authenticated"
                : isSubmitting
                ? "Logging in..."
                : "Log in"
            }
          />
        </div>
      </div>
    </div>
  );
};
