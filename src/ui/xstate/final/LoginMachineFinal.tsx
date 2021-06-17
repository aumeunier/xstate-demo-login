import { useMachine } from "@xstate/react";
import _ from "lodash";
import React from "react";
import { LoginEvents } from "../../../logic/LoginEvents";
import { LoginStates } from "../../../logic/LoginStates";
import { FormCheckbox } from "../../components/FormCheckbox";
import { FormInput } from "../../components/FormInput";
import { AuthButton } from "./AuthButton";
import { AuthHeader } from "./AuthHeader";
import { LoginMachineFinal } from "./LoginMachine";

export const LoginXStateFinal = () => {
  const [machine, sendToMachine] = useMachine(LoginMachineFinal);
  const currentState = machine.value;
  const { invalidLogin, invalidPasswordMessage } = machine.context;
  console.debug(`Machine state -- ${currentState}`);
  let validationText = "Log in";
  switch (currentState) {
    case LoginStates.Authenticated:
      validationText = "Authenticated";
      break;
    case LoginStates.Submitting:
      validationText = "Verifying credentials";
      break;
    case LoginStates.AuthenticationFailed:
      validationText = "Retry ?";
      break;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader />
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <FormInput
              label="Email"
              id="email-address"
              additionalClasses="rounded-t-md"
              isInvalid={invalidLogin}
              disabled={_.includes(
                [LoginStates.Submitting, LoginStates.Authenticated],
                currentState
              )}
              onChange={(login) =>
                sendToMachine(LoginEvents.UpdateLogin, { login })
              }
            />
            <FormInput
              isPassword
              label="Password"
              id="password"
              additionalClasses="rounded-b-md"
              isInvalid={(invalidPasswordMessage?.length ?? 0) > 0}
              disabled={_.includes(
                [LoginStates.Submitting, LoginStates.Authenticated],
                currentState
              )}
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
          <AuthButton machine={machine} sendToMachine={sendToMachine} />
        </div>
      </div>
    </div>
  );
};
