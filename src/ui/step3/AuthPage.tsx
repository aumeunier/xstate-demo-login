import { useMachine } from "@xstate/react";
import React from "react";
import { Authenticator } from "../../domain/auth/Authenticator";
import { AuthMachine } from "../../domain/auth/AuthMachine";
import { AuthStates } from "../../domain/auth/AuthMachineDef";
import { LoginFormMachine } from "../../domain/forms/LoginFormMachine";
import { RegisterFormMachine } from "../../domain/forms/RegisterFormMachine";
import { AuthButton } from "./AuthButton";
import { AuthHeader } from "./AuthHeader";
import { Register } from "./Register";
import { SignIn } from "./SignIn";

export const AuthPage = () => {
  const [authMachine, sendToAuthMachine, authMachineInterpreter] =
    useMachine(AuthMachine);
  const [machine, sendToMachine, machineInterpreter] =
    useMachine(LoginFormMachine);
  const [registerMachine, sendToRegister, registerInterpreter] =
    useMachine(RegisterFormMachine);

  return (
    <Authenticator.Provider
      value={{
        loginMachine: [machine, sendToMachine, machineInterpreter],
        registerMachine: [registerMachine, sendToRegister, registerInterpreter],
        authMachine: [authMachine, sendToAuthMachine, authMachineInterpreter],
      }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <AuthHeader />
          {
            authMachine.value === AuthStates.Register ?
              <Register /> : <SignIn />
          }
          <AuthButton />
        </div>
      </div>
    </Authenticator.Provider>
  );
};
