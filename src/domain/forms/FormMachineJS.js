import { Machine } from "xstate";

const onFormUpdate = { target: "Editing", actions: "onUpdate" };
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
const FormMachineConfig = Machine({
    id: 'formMachine',
    initial: "Editing",

    // State definitions
    states: {
        "Editing": {
            always: [{
                target: "Editing", cond: 'isFormComplete',
            }],
            on: {
                "UpdateForm": onFormUpdate,
                "UpdateFormComplete": "EditingComplete",
            }
        },
        "EditingComplete": {
            // always: [
            //     { target: "InvalidForm, cond: 'isFormIncomplete', actions: 'updateError' },
            // ],
            on: {
                "UpdateForm": onFormUpdate,
                "Validate": "Submitting",
            }
        },
        "Submitting": {
            invoke: {
                src: "submitAsync",
                onError: [{
                    target: "Blocked",
                    cond: "shouldBlock",
                    actions: "onBlock"
                }],
                onDone: [{
                    target: "Validated",
                    cond: "isFormValidated",
                    actions: "onValidated"
                }, {
                    target: "ValidationFailed",
                    actions: "onFormError"
                }]
            }
        },
        "InvalidForm": {
            entry: ['updateIncomplete'],
            exit: ['updateIncomplete'],
            on: {
                "UpdateForm": onFormUpdate,
            }
        },
        "ValidationFailed": {
            on: {
                "UpdateForm": onFormUpdate,
                "Validate": "Submitting",
            }
        },
        "Validated": {
            // type: 'final'
        },
        "Blocked": {
            // type: 'parallel',
        },
    },
});
