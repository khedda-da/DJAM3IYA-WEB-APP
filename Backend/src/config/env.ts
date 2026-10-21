import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, "../../.env") })

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  // Supabase Auth (credentials, sessions and tokens are managed by Supabase, like in LMCS)
  supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  // Required to create the first administrator (/auth/setup). No hardcoded default.
  setupKey: process.env.SETUP_KEY || "",
  // Domain used for the Supabase login e-mail of accounts that have no real e-mail.
  authEmailDomain: process.env.AUTH_EMAIL_DOMAIN || "users.djam3iya.local",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  databaseUrl: process.env.DATABASE_URL || "",
  seedDemoData: process.env.SEED_DEMO_DATA === "true",
  isProduction: process.env.NODE_ENV === "production",
}
