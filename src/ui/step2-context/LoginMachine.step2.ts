import _ from 'lodash';
import { assign, Machine } from 'xstate';
import { LoginEvents } from '../../domain/login/LoginEvents';
import { LoginStates } from '../../domain/login/LoginStates';
import type { LoginContext, LoginEvent, LoginSchema } from './LoginMachineDef';


const onUpdate = { target: LoginStates.Editing, actions: "update" }; // That's just an utility to avoid repeating itself

export const LoginMachineV2 = Machine<LoginContext, LoginSchema, LoginEvent>({
    id: 'login.step2',
    initial: LoginStates.Editing,

    // State definitions
    states: {
        [LoginStates.Editing]: {
            always: [{ // This condition is checked every time we enter that state
                target: LoginStates.EditingComplete,
                cond: 'credentialsFilled', // This is now a "guard"
            }],
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate,
            }
        },
        [LoginStates.EditingComplete]: {
            always: [
                { target: LoginStates.InvalidCredentials, cond: 'loginIsInvalid', actions: 'updateError' }, // guard + action
                { target: LoginStates.InvalidCredentials, cond: 'passwordIsInvalid', actions: 'updateError' }, // guard + action
            ],
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
                onDone: [{
                    target: LoginStates.Authenticated,
                    cond: (context, event) => {
                        return event?.data === true;
                    }, // Inlined guard, to transition conditionally
                }, {
                    target: LoginStates.AuthenticationFailed,
                }]
            }
        },
        [LoginStates.InvalidCredentials]: {
            // We can handle some actions when transiting in or out of a state
            entry: ['updateError'],
            exit: ['updateError'],
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
    // The default implementations can be declared here
    {
        // The guards are conditions on transitions
        guards: {
            loginIsInvalid: (context: LoginContext): boolean =>
                _.isEmpty(context.login),
            passwordIsInvalid: (context: LoginContext): boolean =>
                !(context.password && context.password.length > 6),
            credentialsFilled: (context: LoginContext): boolean => !_.isEmpty(context.login) && !_.isEmpty(context.password),
        },
        // The services are invocations (see Submitting state)
        services: {
            submitAsync: async (context: LoginContext): Promise<boolean> => {
                console.debug(`Authenticating with: ${context.login} -- ${context.password}`)
                await new Promise(res => setTimeout(res, 2000));
                const serverError = false;
                if (serverError)
                    return Promise.reject();
                const success = context.login === "mylogin" && context.password === "mypassword";
                return Promise.resolve(success);
            }
        },
        // Actions are fire-and-forget effects
        actions: {
            updateError: assign((context: LoginContext, event: LoginEvent) => {
                const login = 'login' in event ? event.login : context.login;
                const password = 'password' in event ? event.password : context.password;
                return {
                    login,
                    password,
                    invalidLogin: _.isEmpty(login),
                    invalidPasswordMessage: (password?.length ?? 0) > 6 ? undefined : "Trop court!",
                }
            }),
            update: assign((context: LoginContext, event: LoginEvent) => {
                return {
                    ...context,
                    login: 'login' in event ? event.login : context.login,
                    password: 'password' in event ? event.password : context.password,
                }
            }),
        }
    }
);