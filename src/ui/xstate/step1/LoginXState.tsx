import { useMachine } from "@xstate/react";
import React from "react";
import { LoginEvents } from "../../../logic/LoginEvents";
import { LoginStates } from "../../../logic/LoginStates";
import { Button } from "../../components/Button";
import { FormCheckbox } from "../../components/FormCheckbox";
import { FormInput } from "../../components/FormInput";
import { LoginHeader } from "../../components/LoginHeader";
import { LoginMachineStep1 } from "./LoginMachine";

export const LoginXStatePage = () => {
  const [machine, sendToMachine] = useMachine(LoginMachineStep1);
  const currentState = machine.value;
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
              onChange={(login) =>
                sendToMachine(LoginEvents.UpdateLogin, { login })
              }
            />
            <FormInput
              isPassword
              label="Password"
              id="password"
              additionalClasses="rounded-b-md"
              onChange={(password) =>
                sendToMachine(LoginEvents.UpdatePassword, { password })
              }
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
              onClick={() => sendToMachine(LoginEvents.Validate)}
              disabled={currentState !== LoginStates.EditingComplete}
              text="Log in"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
