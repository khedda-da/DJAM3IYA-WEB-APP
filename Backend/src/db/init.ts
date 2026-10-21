/**
 * One-off database bootstrap: creates/upgrades the schema and seeds the roles.
 * Run it from your machine or CI against the Supabase Postgres, NOT from a request:
 *
 *   DATABASE_URL=postgresql://... npm run db:init
 *
 * (Same idea as LMCS, where the schema lives in Supabase and the app never runs DDL.)
 */
import { ensureDbReady } from "../app.js"

ensureDbReady()
  .then(() => {
    console.log("[db:init] Done.")
    process.exit(0)
  })
  .catch((err) => {
    console.error("[db:init] Failed:", err)
    process.exit(1)
  })
