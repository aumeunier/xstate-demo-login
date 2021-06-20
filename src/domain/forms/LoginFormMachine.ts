import _ from "lodash";
import { assign, DoneEventObject } from "xstate";
import { CreateFormMachine } from "./FormMachine";
import { FormEvents } from "./FormMachineDef";

export type LoginContext = {
    login?: string;
    password?: string;
    invalidMessage?: string,
}

const isComplete = (context: LoginContext): boolean =>
    !_.isEmpty(context.login) && !!(context.password && context.password.length > 6);

export const LoginOptions = {
    guards: {
        isFormComplete: isComplete,
        isFormIncomplete: (context: LoginContext) => !isComplete(context),
        isFormValidated: (context: LoginContext, event: DoneEventObject) => event.data === true,
        // We could implement some logic like after X tries, or on a specific server response
        shouldBlock: (context: LoginContext, event: DoneEventObject) => false,
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
        updateIncomplete: assign((context: LoginContext, event: FormEvents) => {
            const login = _.get(event, 'formData.login', context.login);
            const password = _.get(event, 'formData.password', context.password);
            const updated: LoginContext = {};
            if (_.isEmpty(login) || _.isEmpty(password)) {
                updated.invalidMessage = "Fill-in your login/password";
            } else if (password.length <= 6) {
                updated.invalidMessage = "Password is too short :)";
            }
            return {
                ...context,
                ...updated,
            }
        }),
        onBlock: assign((context: LoginContext, event: FormEvents) => (context)),
        onValidated: assign((context: LoginContext, event: FormEvents) => (context)),
        onFormError: assign((context: LoginContext, event: FormEvents) => {
            return {
                ...context,
                invalidMessage: "Informations incorrectes",
            }
        }),
        onUpdate: assign((context: LoginContext, event: FormEvents) => {
            return {
                ...context,
                invalidMessage: undefined,
                ..._.get(event, 'formData'),
            }
        }),
    }
};
export const LoginFormMachine = CreateFormMachine<LoginContext>(LoginOptions);
