import _ from "lodash";
import React, { useContext } from "react";
import { LoginEvents } from "../../../logic/LoginEvents";
import { LoginStates } from "../../../logic/LoginStates";
import { Button } from "../../components/Button";
import { Authenticator } from "./AuthMachine/Authenticator";

export const AuthButton = () => {
  const { loginMachine: authMachine } = useContext(Authenticator);
  const [machine, authAction] = authMachine!;
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
        onClick={() => authAction(LoginEvents.Validate)}
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
