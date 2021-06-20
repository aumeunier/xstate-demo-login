import _ from "lodash";
import React, { useContext } from "react";
import { Authenticator } from "../../../domain/auth/Authenticator";
import { AuthStates } from "../../../domain/auth/AuthMachineDef";
import { FormEvent, FormStates } from "../../../domain/forms/FormMachineDef";
import { FormInput } from "../../components/FormInput";
import { OtherActions } from "../../components/OtherActions";

export const LoginXStateFinal = () => {
  const { loginMachine, authMachine } = useContext(Authenticator);
  const [machine, authAction, authInterpreter] = loginMachine!;
  const [auth] = authMachine!;

  // This is our current state
  const {
    value: currentState,
    context: { invalidMessage },
  } = machine;
  const { value: authState } = auth;

  authInterpreter.onTransition((listener) => {
    // You can add some debugging info here or update inner state if that's what you want
    console.debug(`Login machine transitions to ${listener.value}`);
  });

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <FormInput
          label="Email"
          id="email-address"
          additionalClasses="rounded-t-md"
          isInvalid={!!invalidMessage}
          disabled={_.includes(
            // TODO: in Machine ? (service or something)
            [FormStates.Submitting, FormStates.Validated],
            currentState
          )}
          onChange={(login) =>
            authAction(FormEvent.UpdateForm, { formData: { login } })
          }
        />
        <FormInput
          isPassword
          label="Password"
          id="password"
          additionalClasses="rounded-b-md"
          isInvalid={!!invalidMessage}
          disabled={_.includes(
            [FormStates.Submitting, FormStates.Validated],
            currentState
          )}
          onChange={(password) =>
            authAction(FormEvent.UpdateForm, { formData: { password } })
          }
        />
        {authState === AuthStates.Register && (
          // TODO: consent
          <FormInput
            isPassword
            label="Password"
            id="password"
            additionalClasses="rounded-b-md"
            isInvalid={!!invalidMessage}
            disabled={_.includes(
              [FormStates.Submitting, FormStates.Validated],
              currentState
            )}
            onChange={(password) =>
              authAction(FormEvent.UpdateForm, { formData: { password } })
            }
          />
        )}
        {/* TODO: other actions should depend on state */}
      </div>

      <OtherActions />
    </div>
  );
};
