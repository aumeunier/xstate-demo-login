import { useMachine } from "@xstate/react";
import React from "react";
import { LoginEvents } from "../../../logic/LoginEvents";
import { LoginStates } from "../../../logic/LoginStates";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/FormInput";
import { LoginHeader } from "../../components/LoginHeader";
import { OtherActions } from "../../components/OtherActions";
import { LoginMachineStep1 } from "./LoginMachine.step1";

export const LoginXStatePage = () => {
  // Initialize a machine
  const [machine, sendToMachine] = useMachine(LoginMachineStep1);

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
                // We don't call state directly
                // The machine is responsible for handling the change event
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

          <OtherActions />
          <Button
            // We delegate the validation logic to the Machine
            onClick={() => sendToMachine(LoginEvents.Validate)}
            // We rely on the machine state for the view display
            disabled={machine.value !== LoginStates.EditingComplete}
            text="Log in"
          />
        </div>
      </div>
    </div>
  );
};
