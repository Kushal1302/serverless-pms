import type { Context, Next } from "hono";
import { fail } from "../utils/response.js";
import { verifier } from "../lib/coginto.js";

export const authMiddleware = async (c: Context, next: Next) => {
  // get auth header
  const authHeader = c.req.header("Authorization");

  // check if header is present
  if (!authHeader) {
    return c.json(fail("Unauthorized"), 401);
  }

  // extract token from header
  const token = authHeader.split(" ")[1];

  // Verify the token
  const payload = await verifier.verify(token);

  // check if token is valid
  if (!payload) {
    return c.json(fail("Invalid token"), 401);
  }

  // Attach user info to context
  c.set("user", payload);

  // call next middleware or controller
  await next();
};
