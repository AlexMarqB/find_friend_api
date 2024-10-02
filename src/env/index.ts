import "dotenv/config"
import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(["test", "development", "production"]).default("development"),
    DATABASE_URL: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env);

if(!parsedEnv.success) {
    console.error(parsedEnv.error.errors);
    process.exit(1);
}

export const env = parsedEnv.data;