import { AssignAction, Machine } from "xstate";
import { FormEvent, FormEvents, FormSchema, FormStates } from "./FormMachine.d";


const onFormUpdate = { target: FormStates.Editing, actions: "onUpdate" };
export const FormMachine = {
    id: 'formMachine',
    initial: FormStates.Editing,

    // State definitions
    states: {
        [FormStates.Editing]: {
            always: [{
                target: FormStates.EditingComplete, cond: 'isFormComplete',
            }],
            on: {
                [FormEvent.UpdateForm]: onFormUpdate,
            }
        },
        [FormStates.EditingComplete]: {
            always: [
                { target: FormStates.InvalidForm, cond: 'isFormIncomplete', actions: 'updateError' },
            ],
            on: {
                [FormEvent.UpdateForm]: onFormUpdate,
                [FormEvent.Validate]: FormStates.Submitting,
            }
        },
        [FormStates.Submitting]: {
            invoke: {
                src: "submitAsync",
                onError: [{
                    target: FormStates.Blocked,
                    cond: "shouldBlock",
                    actions: "onBlock"
                }],
                onDone: [{
                    target: FormStates.Validated,
                    cond: "isFormValidated",
                    actions: "onValidated"
                }, {
                    target: FormStates.ValidationFailed,
                    actions: "onFormError"
                }]
            }
        },
        [FormStates.InvalidForm]: {
            entry: ['updateIncomplete'],
            exit: ['updateIncomplete'],
            on: {
                [FormEvent.UpdateForm]: onFormUpdate,
            }
        },
        [FormStates.ValidationFailed]: {
            on: {
                [FormEvent.UpdateForm]: onFormUpdate,
                [FormEvent.Validate]: FormStates.Submitting,
            }
        },
        [FormStates.Validated]: {
            // type: 'final'
        },
        [FormStates.Blocked]: {
            // type: 'parallel',
        },
    },
};

export interface FormMachineServices<T> {
    guards: {
        isFormComplete: (context: T) => boolean,
        isFormInvalid: (context: T) => boolean,
        isFormValidated: (context: T) => boolean,
        shouldBlock: (context: T) => boolean,
    },
    services: {
        submitAsync: (context: T) => Promise<any>,
    },
    actions: {
        updateIncomplete: AssignAction<T, FormEvents>,
        onUpdate: AssignAction<T, FormEvents>,
        onBlock: AssignAction<T, FormEvents>,
        onFormError: AssignAction<T, FormEvents>,
        onValidated: AssignAction<T, FormEvents>,
    }
};
export const CreateFormMachine = <T>(services: FormMachineServices<T>) => {
    return Machine<T, FormSchema, FormEvents>(
        FormMachine,
        services
    );
}

