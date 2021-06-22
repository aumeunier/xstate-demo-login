import _ from "lodash";
import React, { useContext } from "react";
import { Authenticator } from "../../domain/auth/Authenticator";
import { FormEvent, FormStates } from "../../domain/forms/FormMachineDef";
import { LoginStates } from "../../domain/login/LoginStates";
import { Button } from "../components/Button";

export const AuthButton = () => {
  // This component uses the auth context
  const { loginMachine: authMachine } = useContext(Authenticator);
  const [machine, authAction] = authMachine!;

  // This is Pure, it will always display the same thing
  // given the context/current state of the machine
  const { value: currentState, context } = machine;

  let validationText = "Log in";
  let color = undefined;
  switch (currentState) {
    case FormStates.Editing:
      validationText = context.invalidMessage ?? "Nope.";
      break;
    case FormStates.Validated:
      validationText = "Authenticated";
      color = "bg-green-600";
      break;
    case FormStates.Submitting:
      validationText = "Verifying credentials";
      color = "bg-gray-300";
      break;
    case FormStates.ValidationFailed:
      validationText = context.invalidMessage ?? "Retry ?";
      color = "bg-red-600";
      break;
  }

  return (
    <div>
      <Button
        onClick={() => authAction(FormEvent.Validate)}
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
