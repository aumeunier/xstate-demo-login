import { StateSchema } from "xstate";


export enum AuthStates {
    Register = "register",
    SignIn = "signIn",
    Forgot = "forgot",
    Authenticated = "authenticated"
}

export type AuthSchema = StateSchema<any> & {
    states: {
        [AuthStates.Register]: {},
        [AuthStates.SignIn]: {},
        [AuthStates.Forgot]: {},
        [AuthStates.Authenticated]: {},
    }
}

export enum AuthEvents {
    Validate = "validate",
    UpdateForm = "update",
    Register = "register",
    SignIn = "signIn",
    Forgot = "forgot",
}

export type AuthEvent =
    | { type: AuthEvents.Validate }
    | { type: AuthEvents.Register }
    | { type: AuthEvents.SignIn }
    | { type: AuthEvents.Forgot };

