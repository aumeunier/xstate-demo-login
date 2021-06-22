import { Machine } from 'xstate';
import { AuthEvent, AuthEvents, AuthSchema, AuthStates } from './AuthMachineDef';

export const AuthMachineConfig = {
    id: 'auth',
    initial: AuthStates.SignIn,

    states: {
        [AuthStates.Register]: {
            on: {
                [AuthEvents.SignIn]: AuthStates.SignIn,
                [AuthEvents.Forgot]: AuthStates.Forgot,
            }
        },
        [AuthStates.SignIn]: {
            on: {
                [AuthEvents.Register]: AuthStates.Register,
                [AuthEvents.Forgot]: AuthStates.Forgot,
            }
        },
        [AuthStates.Forgot]: {
            on: {
                [AuthEvents.Register]: AuthStates.Register,
                [AuthEvents.Forgot]: AuthStates.Forgot,
            }
        },
        [AuthStates.Authenticated]: {
            // type: "final"
        },
    },
};
export const AuthMachine = Machine<void, AuthSchema, AuthEvent>(AuthMachineConfig);
