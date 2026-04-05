import { serve } from "@hono/node-server";
import { Hono } from "hono";
import patientRouter from "./modules/patient/patient.routes.js";
import { fail } from "./utils/response.js";
import type { Context } from "hono";

const app = new Hono();

// --- Global Error Handler ---
app.onError((err, c: Context) => {
  console.error(`[Error]: ${err.message}`);

  // if zod error return 400 else 500
  const statusCode = err.name === "ValidationError" ? 400 : 500;

  return c.json(fail(err.message || "Internal Server Error"), statusCode);
});

app.get("/", (c) => {
  return c.text("Serverless PMD API is running");
});

// Patient routes
app.route("/patients", patientRouter);

// Development server
if (process.env.NODE_ENV === "development") {
  serve(
    {
      fetch: app.fetch,
      port: 3000,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    },
  );
}

export default app;
