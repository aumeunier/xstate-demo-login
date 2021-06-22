import { Machine } from "xstate";
import { AuthMachineConfig } from "./AuthMachine";
import { AuthEvents, AuthStates } from "./AuthMachineDef";

it("should be in SignIn state by default", () => {
    const machine = Machine(AuthMachineConfig);
    expect(machine.initialState.value).toMatch(AuthStates.SignIn);
});

it("should be able to transition to Register state", () => {
    const machine = Machine(AuthMachineConfig);
    const newState = machine.transition(machine.initialState, AuthEvents.Register);
    expect(newState.value).toMatch(AuthStates.Register);
});
it("should be able to transition to Forgot state", () => {
    const machine = Machine(AuthMachineConfig);
    const newState = machine.transition(machine.initialState, AuthEvents.Forgot);
    expect(newState.value).toMatch(AuthStates.Forgot);
});

it("should be able to transition back to SignIn state from Register state", () => {
    const machine = Machine(AuthMachineConfig);
    let newState = machine.transition(machine.initialState, AuthEvents.Register)
    newState = machine.transition(newState, AuthEvents.SignIn);
    expect(newState.value).toMatch(AuthStates.SignIn);
});

// it("should be able to transition back to SignIn state from Forgot state", () => {
//     const machine = Machine(AuthMachineConfig);
//     let newState = machine.transition(machine.initialState, AuthEvents.Forgot)
//     newState = machine.transition(newState, AuthEvents.SignIn);
//     expect(newState.value).toMatch(AuthStates.SignIn);
// });



