import { useMachine } from "@xstate/react";
import _ from "lodash";
import React from "react";
import { LoginEvents } from "../../../logic/LoginEvents";
import { LoginStates } from "../../../logic/LoginStates";
import { FormInput } from "../../components/FormInput";
import { OtherActions } from "../../components/OtherActions";
import { AuthButton } from "./AuthButton";
import { AuthHeader } from "./AuthHeader";
import { LoginMachineFinal } from "./LoginMachine";

export const LoginXStateV2 = () => {
  const [machine, sendToMachine, machineInterpreter] =
    useMachine(LoginMachineFinal);
  const currentState = machine.value;
  const { invalidLogin, invalidPasswordMessage } = machine.context;

  // This helps to debug ;)
  machineInterpreter.onTransition((current) =>
    console.debug(`Machine transitions to ${current.value}`)
  );

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

          <OtherActions />
          <AuthButton machine={machine} sendToMachine={sendToMachine} />
        </div>
      </div>
    </div>
  );
};