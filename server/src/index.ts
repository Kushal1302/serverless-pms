import { serve } from "@hono/node-server";
import { Hono } from "hono";
import patientRouter from "./modules/patient/patient.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
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
