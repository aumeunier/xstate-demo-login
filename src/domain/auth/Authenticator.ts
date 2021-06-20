import React from "react";
import { Interpreter, State } from "xstate";
import { FormEvents, FormSchema } from "../forms/FormMachineDef";
import { LoginContext } from "../forms/LoginFormMachine";
import { AuthContext, AuthEvent, AuthSchema } from "./AuthMachineDef";

export interface AuthProps {
    loginMachine?: [
        State<LoginContext, FormEvents, FormSchema>,
        Interpreter<LoginContext, FormSchema, FormEvents>['send'],
        Interpreter<LoginContext, FormSchema, FormEvents>
    ],
    authMachine?: [
        State<AuthContext, AuthEvent, AuthSchema>,
        Interpreter<AuthContext, AuthSchema, AuthEvent>['send'],
        Interpreter<AuthContext, AuthSchema, AuthEvent>
    ]
}

export const Authenticator = React.createContext<AuthProps>({});
Authenticator.displayName = "Authenticator";
