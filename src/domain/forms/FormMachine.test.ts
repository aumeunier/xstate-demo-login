import { assert } from "console";
import { assign, DoneEventObject, interpret, Machine } from "xstate";
import { FormMachineConfig } from "./FormMachine";
import { FormEvent, FormEvents, FormStates } from "./FormMachineDef";

interface MockContextProps {
    isDone: boolean,
};

const submit = jest.fn();
const mockServices = {
    guards: {
        isFormComplete: (context: MockContextProps) => context.isDone,
        isFormIncomplete: (context: MockContextProps) => !context.isDone,
        isFormValidated: (context: MockContextProps, event: DoneEventObject) => true,
        shouldBlock: (context: MockContextProps, event: DoneEventObject) => false,
    },
    services: {
        submitAsync: (context: MockContextProps) => {
            submit();
            return Promise.resolve(true)
        },
    },
    actions: {
        updateIncomplete: assign((context: MockContextProps, event: FormEvents) => (context)),
        onUpdate: assign((context: MockContextProps, event: FormEvents) => (context)),
        onBlock: assign((context: MockContextProps, event: FormEvents) => (context)),
        onFormError: assign((context: MockContextProps, event: FormEvents) => (context)),
        onValidated: assign((context: MockContextProps, event: FormEvents) => (context)),
    }
}

it("should be in Editing state by default", () => {
    const machine = Machine(FormMachineConfig).withConfig(mockServices, { isDone: false });
    expect(machine.initialState.value).toEqual(FormStates.Editing);
    expect(machine.context.isDone).toBeFalsy();
});

it("should be transiting to EditingComplete state if Done", () => {
    const machine = Machine(FormMachineConfig).withConfig(mockServices, { isDone: true });
    expect(machine.initialState.value).toEqual(FormStates.EditingComplete);
    expect(machine.context.isDone).toBeTruthy();
});

it("should transition to Submitting on Validate event", (done) => {
    let hasBeenThroughSubmitting = false;
    const machine = Machine(FormMachineConfig).withConfig(mockServices, { isDone: true });
    const fetchService = interpret(machine).onTransition((state) => {
        if (state.value === FormStates.Submitting) {
            // It should go through Submitting state after Validate event
            hasBeenThroughSubmitting = true;
        }
        if (state.value === FormStates.Validated) {
            // The validation function returns true => it should go to Validated state
            assert(hasBeenThroughSubmitting === true);
            done();
        }
    });
    fetchService.start();
    fetchService.send({ type: FormEvent.Validate });
});

it("shouldn't transition to Submitting from Editing state", () => {
    const machine = Machine(FormMachineConfig).withConfig(mockServices, { isDone: false });
    const fetchService = interpret(machine).onTransition((state) => {
        if (state.value === FormStates.Submitting) {
            throw new Error("this state should not be reachable");
        }
    });
    fetchService.start();
    fetchService.send({ type: FormEvent.Validate });
});

// ...