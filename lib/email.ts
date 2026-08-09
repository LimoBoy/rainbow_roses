import nodemailer from "nodemailer";

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };

        return entities[character];
    });
}

function getAppUrl() {
    const value = process.env.APP_URL ?? process.env.NEXTAUTH_URL;

    if (!value) {
        throw new Error("APP_URL or NEXTAUTH_URL must be configured to send activation emails.");
    }

    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("The application URL must use http or https.");
    }

    return url.origin;
}

export async function sendActivationEmail({
    email,
    firstName,
    code,
}: {
    email: string;
    firstName: string;
    code: string;
}) {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
        throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD must be configured to send activation emails.");
    }

    const activationUrl = new URL(`/activation/${encodeURIComponent(code)}`, getAppUrl()).toString();
    const safeFirstName = escapeHtml(firstName);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM ?? user,
        to: email,
        subject: "Activate your account",
        text: `Hi ${firstName}, activate your account by opening this link: ${activationUrl}`,
        html: `<p>Hi ${safeFirstName},</p><p>Thanks for creating an account. Activate it by clicking the link below:</p><p><a href="${activationUrl}">Activate your account</a></p><p>This link expires in 24 hours.</p>`,
    });
}
