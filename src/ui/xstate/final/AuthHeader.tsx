import React, { useContext } from "react";
import { Authenticator } from "./AuthMachine/Authenticator";
import { AuthEvents, AuthStates } from "./AuthMachine/AuthMachine.d";

export const AuthHeader = () => {
  const { authMachine } = useContext(Authenticator);
  const [machine, authAction] = authMachine!;
  const currentState = machine.value;

  return (
    <div>
      <img className="mx-auto h-12 w-auto" src="/d-edge.png" alt="D-EDGE" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {currentState === AuthStates.Register ? "Register" : "Sign in"}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{" "}
        <span
          className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
          onClick={() =>
            authAction(
              currentState === AuthStates.Register
                ? AuthEvents.SignIn
                : AuthEvents.Register
            )
          }
        >
          {currentState === AuthStates.Register
            ? "sign in"
            : "create your account"}
        </span>
      </p>
    </div>
  );
};
