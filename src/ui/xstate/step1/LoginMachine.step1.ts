import _ from 'lodash';
import { assign, Machine } from 'xstate';
import { LoginEvents } from '../../../logic/LoginEvents';
import { LoginStates } from '../../../logic/LoginStates';

interface LoginContext {
    login?: string;
    password?: string;
}
interface LoginSchema {
    states: {
        [LoginStates.Editing]: {},
        [LoginStates.EditingComplete]: {},
        [LoginStates.Submitting]: {},
        [LoginStates.InvalidCredentials]: {},
        [LoginStates.AuthenticationFailed]: {},
        [LoginStates.Authenticated]: {},
    }
}
export type UpdateLogin = {
    type: LoginEvents.UpdateLogin,
    login: string,
}
export type UpdatePassword = {
    type: LoginEvents.UpdatePassword,
    password: string,
}
export type LoginEvent =
    | { type: LoginEvents }
    | UpdateLogin
    | UpdatePassword;

export const loginIsValid = (context: LoginContext): boolean =>
    !_.isEmpty(context.login);
export const passwordIsValid = (context: LoginContext): boolean =>
    !!(context.password && context.password.length > 6);

const onUpdate = {
    target: LoginStates.Editing,
    actions: "update"
};
export const LoginMachineStep1 = Machine<LoginContext, LoginSchema, LoginEvent>({
    id: 'login',
    initial: LoginStates.Editing,

    // State definitions
    states: {
        [LoginStates.Editing]: {
            always: [{
                target: LoginStates.EditingComplete,
                cond: (context: LoginContext, event: LoginEvent) => loginIsValid(context) && passwordIsValid(context),
            }],
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate,
            }
        },
        [LoginStates.EditingComplete]: {
            always: [{
                target: LoginStates.Editing,
                cond: (context: LoginContext, event: LoginEvent) => !(loginIsValid(context) && passwordIsValid(context)),
            }],
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate,
                [LoginEvents.Validate]: LoginStates.Submitting,
            }
        },
        [LoginStates.Submitting]: {
            invoke: {
                src: "submitAsync",
                onError: {
                    target: LoginStates.AuthenticationFailed,
                },
                onDone: {
                    target: LoginStates.Authenticated,
                }
            }
        },
        [LoginStates.InvalidCredentials]: {
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate
            }
        },
        [LoginStates.AuthenticationFailed]: {
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate,
                [LoginEvents.Validate]: LoginStates.Submitting,
            }
        },
        [LoginStates.Authenticated]: {
            type: "final"
        },
    },
},
    {
        services: {
            submitAsync: async (context: LoginContext): Promise<boolean> => {
                console.debug(`Authenticating with: ${context.login}, ${context.password}`)
                // We would probably have some service call logic handled in another file here
                await new Promise(res => setTimeout(res, 2000));
                return Promise.resolve(true);
            }
        },
        actions: {
            update: assign((context: LoginContext, event: LoginEvent) => {
                return {
                    ...context,
                    login: 'login' in event ? event.login : context.login,
                    password: 'password' in event ? event.password : context.password,
                }
            }),
        }
    });