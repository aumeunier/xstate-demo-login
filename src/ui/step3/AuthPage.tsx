import { useMachine } from "@xstate/react";
import React from "react";
import { Authenticator } from "../../domain/auth/Authenticator";
import { AuthMachine } from "../../domain/auth/AuthMachine";
import { LoginFormMachine } from "../../domain/forms/LoginFormMachine";
import { AuthButton } from "./AuthButton";
import { AuthHeader } from "./AuthHeader";
import { LoginOrRegister } from "./SignInOrRegister";

export const AuthPage = () => {
  const [authMachine, sendToAuthMachine, authMachineInterpreter] =
    useMachine(AuthMachine);
  const [machine, sendToMachine, machineInterpreter] =
    useMachine(LoginFormMachine);

  return (
    <Authenticator.Provider
      value={{
        loginMachine: [machine, sendToMachine, machineInterpreter],
        authMachine: [authMachine, sendToAuthMachine, authMachineInterpreter],
      }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <AuthHeader />
          <LoginOrRegister />
          <AuthButton />
        </div>
      </div>
    </Authenticator.Provider>
  );
};
