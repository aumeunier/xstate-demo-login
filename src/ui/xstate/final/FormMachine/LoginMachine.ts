import _ from "lodash";
import { assign } from "xstate";
import { LoginContext } from "../../../../logic/LoginMachine";
import { CreateFormMachine } from "./FormMachine";
import { FormEvents } from "./FormMachine.d";

export const LoginFormMachine = CreateFormMachine<LoginContext>({
    guards: {
        isFormComplete: (context: LoginContext) => true,
        isFormInvalid: (context: LoginContext) => true,
        isFormValidated: (context: LoginContext) => true,
        shouldBlock: (context: LoginContext) => true,
    },
    services: {
        submitAsync: async (context: LoginContext): Promise<any> => {
            console.debug(`Authenticating with: ${context.login} -- ${context.password}`)
            await new Promise(res => setTimeout(res, 2000));
            const serverError = false;
            if (serverError)
                return Promise.reject();
            const success = context.login === "mylogin" && context.password === "mypassword";
            return Promise.resolve(success);
        }
    },
    actions: {
        updateIncomplete: assign((context: LoginContext, event: FormEvents) => (context)),
        onBlock: assign((context: LoginContext, event: FormEvents) => (context)),
        onValidated: assign((context: LoginContext, event: FormEvents) => (context)),
        onFormError: assign((context: LoginContext, event: FormEvents) => {
            const login = _.get(event, 'formData.login', context.login);
            const password = _.get(event, 'formData.password', context.password);
            return {
                invalidLogin: _.isEmpty(login),
                invalidPasswordMessage: (password?.length ?? 0) > 6 ? undefined : "Trop court!",
            }
        }),
        onUpdate: assign((context: LoginContext, event: FormEvents) => {
            return {
                ...context,
                ..._.get(event, 'formData'),
            }
        }),
    }
});
