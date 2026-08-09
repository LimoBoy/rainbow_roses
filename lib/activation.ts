import crypto from "crypto";

export const ACTIVATION_TOKEN_BYTES = 32;
export const ACTIVATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export function createActivationToken() {
    return {
        code: crypto.randomBytes(ACTIVATION_TOKEN_BYTES).toString("hex"),
        expiresAt: new Date(Date.now() + ACTIVATION_TOKEN_TTL_MS),
    };
}

export function isActivationCode(value: unknown): value is string {
    return typeof value === "string" && /^[a-f0-9]{64}$/i.test(value);
}
