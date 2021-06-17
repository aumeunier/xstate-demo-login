import { LoginStates } from '../../../logic/LoginStates';

export type LoginContext = {
    login?: string;
    password?: string;
    invalidLogin?: boolean;
    invalidPasswordMessage?: string;
}
export type LoginSchema = {
    states: {
        [LoginStates.Editing]: {},
        [LoginStates.EditingComplete]: {},
        [LoginStates.Submitting]: {},
        [LoginStates.InvalidCredentials]: {},
        [LoginStates.AuthenticationFailed]: {},
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