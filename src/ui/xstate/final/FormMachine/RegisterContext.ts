

export type RegisterContext = {
    login?: string;
    password?: string;
    consent?: boolean;
    invalidLogin?: boolean,
    invalidConsent?: boolean,
    invalidPasswordMessage?: string,
}
