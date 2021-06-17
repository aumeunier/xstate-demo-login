import { createMachine } from 'xstate';

export const LoginMachine = createMachine({
    id: 'login',
    initial: "editing",

    // Local context for entire machine
    context: {
    },

    // State definitions
    states: {
        "editing": {},
        "submitting": {},
        "errorEmail": {},
        "errorPassword": {},
        "AuthenticationFailed": {},
        "errorServiceDown": {},
        "authenticated": {}
    }
});