export interface Auth {
    email: string,
    password: string
};
export type AuthSymbol = "email" | "password";

export interface UpdateAuth extends Auth {
    newPassword: string | null
};

export type SystemProperties = "id" | "createdAt" | "updatedAt";