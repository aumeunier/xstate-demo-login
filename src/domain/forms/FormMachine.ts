import { AssignAction, DoneEventObject, Machine, MachineConfig, MachineOptions } from "xstate";
import { FormEvent, FormEvents, FormSchema, FormStates } from "./FormMachineDef";

/**
 * Constructor for a FormMachine, using the abstract configuration of the FormMachine.
 * Requires the implementation of the services (called "Options" in XState).
 * See https://xstate.js.org/docs/guides/machines.html#options
 * 
 * @param services required implementation of the actions, activities, delays, guards and services
 *  that are referenced as strings in the machine configuration.
 * @returns 
 */
export const CreateFormMachine = <T>(services: FormMachineServices<T>) => {
    return Machine<T, FormSchema, FormEvents>(
        FormMachineConfig,
        services
    );
}

// Utility as the FormUpdate transition is often used in the Machine
const onFormUpdate = { target: FormStates.Editing, actions: "onUpdate" };
/**
 * This is the definition of the StateMachine.
 * This machine defines a generic behavior for a form feature:
 * - events (update, submitting, result of the submit)
 * - transitions
 * - guards/actions/services to call WITHOUT defining them
 * 
 * Note that the "context" is set as 'any' because the machine itself does not
 * deal with the context within the form.
 */
const FormMachineConfig: MachineConfig<any, FormSchema, FormEvents> = {
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
            // always: [
            //     { target: FormStates.InvalidForm, cond: 'isFormIncomplete', actions: 'updateError' },
            // ],
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

/**
 * Interface for a Form Machine implementation.
 * In order to be complete, the form machine needs several guards, services and actions.
 */
export interface FormMachineServices<T> extends Partial<MachineOptions<T, FormEvents>> {
    guards: {
        isFormComplete: (context: T) => boolean,
        isFormIncomplete: (context: T) => boolean,
        isFormValidated: (context: T, event: DoneEventObject) => boolean,
        shouldBlock: (context: T, event: DoneEventObject) => boolean,
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
