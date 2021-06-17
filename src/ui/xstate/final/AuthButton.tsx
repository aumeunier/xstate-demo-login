import _ from "lodash";
import React from "react";
import { State } from "xstate";
import { LoginEvents } from "../../../logic/LoginEvents";
import { LoginContext, LoginEvent } from "../../../logic/LoginMachine.d";
import { LoginStates } from "../../../logic/LoginStates";
import { Button } from "../../components/Button";

interface ButtonProps {
  machine: State<
    LoginContext,
    LoginEvent,
    any,
    {
      value: any;
      context: LoginContext;
    }
  >;
  sendToMachine: (e: LoginEvents) => void;
}
export const AuthButton = ({ machine, sendToMachine }: ButtonProps) => {
  const currentState = machine.value;
  let validationText = "Log in";
  let color = undefined;
  switch (currentState) {
    case LoginStates.Authenticated:
      validationText = "Authenticated";
      color = "bg-green-600";
      break;
    case LoginStates.Submitting:
      validationText = "Verifying credentials";
      color = "bg-gray-300";
      break;
    case LoginStates.AuthenticationFailed:
      validationText = "Retry ?";
      color = "bg-red-600";
      break;
  }

  return (
    <div>
      <Button
        onClick={() => sendToMachine(LoginEvents.Validate)}
        disabled={
          !_.includes(
            [LoginStates.EditingComplete, LoginStates.AuthenticationFailed],
            currentState
          )
        }
        text={validationText}
        color={color}
      />
    </div>
  );
};
