import React from "react";
import { Interpreter, State } from "xstate";
import { LoginContext, LoginEvent, LoginSchema } from "../../../../logic/LoginMachine";
import { AuthContext, AuthEvent, AuthSchema } from "./AuthMachine.d";

export interface AuthProps {
    loginMachine?: [
        State<LoginContext, LoginEvent, LoginSchema>,
        Interpreter<LoginContext, LoginSchema, LoginEvent>['send'],
        Interpreter<LoginContext, LoginSchema, LoginEvent>
    ],
    authMachine?: [
        State<AuthContext, AuthEvent, AuthSchema>,
        Interpreter<AuthContext, AuthSchema, AuthEvent>['send'],
        Interpreter<AuthContext, AuthSchema, AuthEvent>
    ]
}

export const Authenticator = React.createContext<AuthProps>({});
Authenticator.displayName = "Authenticator";
