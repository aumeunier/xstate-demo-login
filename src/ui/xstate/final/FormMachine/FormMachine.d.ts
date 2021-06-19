
export enum FormStates {
    Editing = "editing",
    EditingComplete = "editingComplete",
    Submitting = "submitting",
    InvalidForm = "invalidForm",
    ValidationFailed = "validationFailed",
    Validated = "validated",
    Blocked = "blocked"
}
export type FormSchema = {
    states: {
        [FormStates.Editing]: {},
        [FormStates.EditingComplete]: {},
        [FormStates.Submitting]: {},
        [FormStates.InvalidForm]: {},
        [FormStates.ValidationFailed]: {},
        [FormStates.Validated]: {},
        [FormStates.Blocked]: {},
    }
}
export enum FormEvent {
    Validate = "validate",
    UpdateForm = "update",
}
export type FormEvents =
    | { type: FormEvent.UpdateForm, formData: any }
    | { type: FormEvent.Validate };
