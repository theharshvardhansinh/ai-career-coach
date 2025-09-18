import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./config/scema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
