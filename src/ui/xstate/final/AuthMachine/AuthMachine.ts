import { Machine } from 'xstate';
import { AuthContext, AuthEvent, AuthEvents, AuthSchema, AuthStates } from './AuthMachine.d';


export const AuthMachine = Machine<AuthContext, AuthSchema, AuthEvent>({
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
        [AuthStates.Authenticated]: { type: "final" },
    },
});
