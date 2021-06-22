import _ from "lodash";
import React, { useContext } from "react";
import { Authenticator } from "../../domain/auth/Authenticator";
import { FormEvent, FormStates } from "../../domain/forms/FormMachineDef";
import { FormInput } from "../components/FormInput";

export const Register = () => {
  const { registerMachine } = useContext(Authenticator);
  const [machine, authAction, authInterpreter] = registerMachine!;

  // This is our current state
  const {
    value: currentState,
    context: { invalidMessage },
  } = machine;

  authInterpreter.onTransition((listener) => {
    // You can add some debugging info here or update inner state if that's what you want
    console.debug(`Login machine transitions to ${listener.value}`);
  });

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <FormInput
          label="Email"
          id="email-address-register"
          additionalClasses="rounded-t-md"
          isInvalid={!!invalidMessage}
          disabled={_.includes(
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
          id="password-register"
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
      </div>
    </div>
  );
};
