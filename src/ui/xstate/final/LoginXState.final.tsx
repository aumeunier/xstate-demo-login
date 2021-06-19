import _ from "lodash";
import React, { useContext } from "react";
import { LoginEvents } from "../../../logic/LoginEvents";
import { FormInput } from "../../components/FormInput";
import { OtherActions } from "../../components/OtherActions";
import { Authenticator } from "./AuthMachine/Authenticator";
import { AuthStates } from "./AuthMachine/AuthMachine.d";
import { FormStates } from "./FormMachine/FormMachine.d";

export const LoginXStateFinal = () => {
  const { loginMachine, authMachine } = useContext(Authenticator);
  const [machine, authAction, authInterpreter] = loginMachine!;
  const [auth] = authMachine!;

  // This is our current state
  const {
    value: currentState,
    context: { invalidLogin, invalidPasswordMessage },
  } = machine;
  const { value: authState } = auth;

  // This helps to debug ;)
  authInterpreter.onTransition((listener) =>
    console.debug(`Machine transitions to ${listener.value}`)
  );

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <FormInput
          label="Email"
          id="email-address"
          additionalClasses="rounded-t-md"
          isInvalid={invalidLogin}
          disabled={_.includes(
            // TODO: in Machine ? (service or something)
            [FormStates.Submitting, FormStates.Validated],
            currentState
          )}
          onChange={(login) => authAction(LoginEvents.UpdateLogin, { login })}
        />
        <FormInput
          isPassword
          label="Password"
          id="password"
          additionalClasses="rounded-b-md"
          isInvalid={(invalidPasswordMessage?.length ?? 0) > 0}
          disabled={_.includes(
            [FormStates.Submitting, FormStates.Validated],
            currentState
          )}
          onChange={(password) =>
            authAction(LoginEvents.UpdatePassword, { password })
          }
        />
        {authState === AuthStates.Register && (
          // TODO: consent 
          <FormInput
            isPassword
            label="Password"
            id="password"
            additionalClasses="rounded-b-md"
            isInvalid={(invalidPasswordMessage?.length ?? 0) > 0}
            disabled={_.includes(
              [FormStates.Submitting, FormStates.Validated],
              currentState
            )}
            onChange={(password) =>
              authAction(LoginEvents.UpdatePassword, { password })
            }
          />
        )}
        {/* TODO: other actions should depend on state */}
      </div>

      <OtherActions />
    </div>
  );
};
