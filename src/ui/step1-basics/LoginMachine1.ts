import _ from 'lodash';
import { assign, Machine } from 'xstate';
import { LoginEvents } from '../../domain/login/LoginEvents';
import { LoginStates } from '../../domain/login/LoginStates';

const onUpdate = { target: LoginStates.Editing, actions: "update" }; // That's just an utility to avoid repeating itself

/**
 * This is pretty much the ~state of the machine
 */
interface LoginContext {
    login?: string;
    password?: string;
}
/**
 * The schema is the structure the machine has to respect,
 * especially the states (nodes) it has to support.
 */
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
/**
 * This is the Machine definition.
 * It should declare:
 * - the context of the machine
 * - the available states (nodes) the machine can be in, and the available transitions within (the events to respond to when in a given state)
 * - the initial state
 *
 * You can also specify services, guards, actions...
 */
export const LoginMachineStep1 = Machine<LoginContext, LoginSchema, LoginEvent>({
    id: 'login.step1',
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

export type UpdateLogin = {
    type: LoginEvents.UpdateLogin,
    login: string,
}
export type UpdatePassword = {
    type: LoginEvents.UpdatePassword,
    password: string,
}

// All the available events for this machine
export type LoginEvent =
    | { type: LoginEvents.Validate }
    | UpdateLogin
    | UpdatePassword;

export const loginIsValid = (context: LoginContext): boolean =>
    !_.isEmpty(context.login);
export const passwordIsValid = (context: LoginContext): boolean =>
    !!(context.password && context.password.length > 6);
