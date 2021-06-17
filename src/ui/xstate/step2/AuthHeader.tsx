import { useMachine } from "@xstate/react";
import React from "react";
import { AuthStates } from "../../../logic/AuthStates";
import { LoginMachineFinal } from "./LoginMachine";

export const AuthHeader = () => {
  const [machine] = useMachine(LoginMachineFinal);
  const currentState = machine.value;
  return (
    <div>
      <img className="mx-auto h-12 w-auto" src="/d-edge.png" alt="D-EDGE" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {currentState === AuthStates.Register ? "Register" : "Sign in"}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{" "}
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          {currentState === AuthStates.Register
            ? "sign in"
            : "create your account"}
        </a>
      </p>
    </div>
  );
};
