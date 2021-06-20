import { EventObject, StateSchema } from "xstate"

export type AuthContext = {
    login?: string;
    password?: string;
    invalidLogin?: boolean;
    invalidPasswordMessage?: string;
}

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

export type UpdateRegisterForm = {
    type: AuthEvents.UpdateForm,
    login?: string,
    password?: string,
    consent?: boolean,
}

export type UpdateLoginForm = {
    type: AuthEvents.UpdateForm,
    login?: string,
    password?: string,
}

export type AuthEvent = EventObject &
{ type: AuthEvents.Validate }
    | { type: AuthEvents.Register }
    | { type: AuthEvents.SignIn }
    | { type: AuthEvents.Forgot }
    | UpdateRegisterForm
    | UpdateLoginForm;

