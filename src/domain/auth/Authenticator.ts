import React from "react";
import { Interpreter, State } from "xstate";
import { FormEvents, FormSchema } from "../forms/FormMachineDef";
import { LoginContext } from "../forms/LoginFormMachine";
import { AuthEvent, AuthSchema } from "./AuthMachineDef";

export interface AuthProps {
    loginMachine?: [
        State<LoginContext, FormEvents, FormSchema>,
        Interpreter<LoginContext, FormSchema, FormEvents>['send'],
        Interpreter<LoginContext, FormSchema, FormEvents>
    ],
    authMachine?: [
        State<any, AuthEvent, AuthSchema>,
        Interpreter<void, AuthSchema, AuthEvent>['send'],
        Interpreter<void, AuthSchema, AuthEvent>
    ]
}

export const Authenticator = React.createContext<AuthProps>({});
Authenticator.displayName = "Authenticator";
