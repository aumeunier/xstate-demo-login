import _ from "lodash";
import { assign, DoneEventObject } from "xstate";
import { CreateFormMachine } from "./FormMachine";
import { FormEvents } from "./FormMachineDef";

export type RegisterContext = {
    login?: string;
    password?: string;
    consent?: boolean;
    invalidMessage?: string,
    invalidLogin?: boolean,
    invalidConsent?: boolean,
}

export const RegisterFormMachine = CreateFormMachine<RegisterContext>({
    guards: {
        isFormComplete: (context: RegisterContext) => !_.isEmpty(context.login) && !_.isEmpty(context.password),
        isFormIncomplete: (context: RegisterContext) => _.isEmpty(context.login) || _.isEmpty(context.password),
        isFormValidated: (context: RegisterContext, event: DoneEventObject) => event.data === true,
        shouldBlock: (context: RegisterContext) => true,
    },
    services: {
        submitAsync: async (context: RegisterContext): Promise<any> => {
            console.debug(`Registering with: ${context.login} -- ${context.password}`)
            await new Promise(res => setTimeout(res, 2000));
            const serverError = false;
            if (serverError)
                return Promise.reject();
            const success = context.login !== "mylogin";
            return Promise.resolve(success);
        }
    },
    actions: {
        updateIncomplete: assign((context: RegisterContext, event: FormEvents) => (context)),
        onBlock: assign((context: RegisterContext, event: FormEvents) => (context)),
        onValidated: assign((context: RegisterContext, event: FormEvents) => (context)),
        onFormError: assign((context: RegisterContext, event: FormEvents) => {
            const login = _.get(event, 'formData.login', context.login);
            const password = _.get(event, 'formData.password', context.password);
            const consent = _.get(event, 'formData.consent', context.consent);
            return {
                invalidLogin: _.isEmpty(login),
                invalidPasswordMessage: (password?.length ?? 0) > 6 ? undefined : "Trop court!",
                invalidConsnet: consent !== true,
            }
        }),
        onUpdate: assign((context: RegisterContext, event: FormEvents) => {
            return {
                ...context,
                ..._.get(event, 'formData'),
            }
        }),
    }
});