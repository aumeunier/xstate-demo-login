import { Machine } from 'xstate';

const AuthMachine = Machine({
    id: 'auth',
    initial: "SignIn",
    states: {
        "Register": {
            on: {
                "SignIn": "SignIn",
                "Forgot": "Forgot",
            }
        },
        "SignIn": {
            on: {
                "Register": "Register",
                "Forgot": "Forgot",
            }
        },
        "Forgot": {
            on: {
                "Register": "Register",
                "Forgot": "Forgot",
            }
        },
        "Authenticated": { type: "final" },
    },
});
