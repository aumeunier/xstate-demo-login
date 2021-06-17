import _ from 'lodash';
import { assign, Machine } from 'xstate';
import { LoginEvents } from '../../../logic/LoginEvents';
import type { LoginContext, LoginEvent, LoginSchema } from '../../../logic/LoginMachine';
import { LoginStates } from '../../../logic/LoginStates';


const onUpdate = {
    target: LoginStates.Editing,
    actions: "update"
};
export const LoginMachineV2 = Machine<LoginContext, LoginSchema, LoginEvent>({
    id: 'login',
    initial: LoginStates.Editing,

    // State definitions
    states: {
        [LoginStates.Editing]: {
            always: [{
                target: LoginStates.EditingComplete,
                cond: 'credentialsFilled',
            }],
            on: {
                [LoginEvents.UpdateLogin]: onUpdate,
                [LoginEvents.UpdatePassword]: onUpdate,
            }
        },
        [LoginStates.EditingComplete]: {
            always: [
                { target: LoginStates.InvalidCredentials, cond: 'loginIsInvalid', actions: 'updateError' },
                { target: LoginStates.InvalidCredentials, cond: 'passwordIsInvalid', actions: 'updateError' },
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
                    },
                }, {
                    target: LoginStates.AuthenticationFailed,
                }]
            }
        },
        [LoginStates.InvalidCredentials]: {
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
        // TODO: Too many tentatives, you have been blocked!
    },
},
    {
        guards: {
            loginIsInvalid: (context: LoginContext): boolean =>
                _.isEmpty(context.login),
            passwordIsInvalid: (context: LoginContext): boolean =>
                !(context.password && context.password.length > 6),
            credentialsFilled: (context: LoginContext): boolean => !_.isEmpty(context.login) && !_.isEmpty(context.password),
        },
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
        actions: {
            updateError: assign((context: LoginContext, event: LoginEvent) => {
                const login = 'login' in event ? event.login : context.login;
                const password = 'password' in event ? event.password : context.password;
                return {
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