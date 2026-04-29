import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import Database from "better-sqlite3";

// Strip "file:" prefix — better-sqlite3 expects a raw file path
const dbPath = (process.env.DATABASE_URL || "file:./dev.db").replace(/^file:/, "");

export const auth = betterAuth({
    database: new Database(dbPath),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        jwt()
    ]
});
