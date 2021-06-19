import { useMachine } from "@xstate/react";
import React from "react";
import { AuthButton } from "./AuthButton";
import { AuthHeader } from "./AuthHeader";
import { Authenticator } from "./AuthMachine/Authenticator";
import { AuthMachine } from "./AuthMachine/AuthMachine";
import { LoginMachineFinal } from "./LoginMachine";
import { LoginXStateFinal } from "./LoginXState.final";

export const AuthPage = () => {
  const [authMachine, sendToAuthMachine, authMachineInterpreter] =
    useMachine(AuthMachine);
  const [machine, sendToMachine, machineInterpreter] =
    useMachine(LoginMachineFinal);

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
          <LoginXStateFinal />
          <AuthButton />
        </div>
      </div>
    </Authenticator.Provider>
  );
};
