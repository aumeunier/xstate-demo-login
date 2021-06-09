import _ from 'lodash';
import { Machine } from 'xstate';

export enum LoginStates {
    Editing = "editing",
    EditingComplete = "editingComplete",
    Submitting = "submitting",
    InvalidEmail = "errorEmail",
    InvalidPassword = "errorPassword",
    ErrorCredentials = "errorCredentials",
    ErrorServiceDown = "errorServiceDown",
    Authenticated = "authenticated"
}
interface LoginContext {
    login?: string;
    password?: string;
}
interface LoginSchema {
    states: {
        [LoginStates.Editing]: {},
        [LoginStates.EditingComplete]: {},
        [LoginStates.Submitting]: {},
        [LoginStates.InvalidEmail]: {},
        [LoginStates.InvalidPassword]: {},
        [LoginStates.ErrorCredentials]: {},
        [LoginStates.ErrorServiceDown]: {},
        [LoginStates.Authenticated]: {},
    }
}
export enum LoginEvents {
    Validate = "validate",
    UpdateLogin = "updateLogin",
    UpdatePassword = "updatePassword",
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
    actions: (context: LoginContext, event: UpdateLogin | UpdatePassword) =>
    ({
        login: 'login' in event ? event.login : context.login,
        password: 'password' in event ? event.password : context.password,
    })
};
export const LoginMachine = Machine<LoginContext, LoginSchema, LoginEvent>({
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
                [LoginEvents.UpdatePassword]: onUpdate
            }
        },
        [LoginStates.EditingComplete]: {
            always: [{
                target: LoginStates.Editing,
                cond: (context: LoginContext, event: LoginEvent) => !!(loginIsValid(context) && passwordIsValid(context)),
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
                    target: LoginStates.ErrorServiceDown,
                },
                onDone: {
                    target: LoginStates.Authenticated,
                }
            }
        },
        [LoginStates.InvalidEmail]: {
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate
            }
        },
        [LoginStates.InvalidPassword]: {
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate
            }
        },
        [LoginStates.ErrorCredentials]: {
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate,
                // TODO: We should be able to retry, right?
                // [LoginEvents.Validate]: LoginStates.Submitting,
            }
        },
        [LoginStates.ErrorServiceDown]: {
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate,
                [LoginEvents.Validate]: LoginStates.Submitting,
            }
        },
        [LoginStates.Authenticated]: {
            type: "final"
        },
        // TODO: Too many tentatives, you have been blocked!
    },
},
    {
        services: {
            submitAsync: async (context: LoginContext): Promise<boolean> => {
                console.debug(`Authenticating with: ${context.login}, ${context.password}`)
                await new Promise(res => setTimeout(res, 5000));
                return Promise.resolve(true);
            }
        }
    });