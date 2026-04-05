import { Hono } from "hono";
import {
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
  searchPatients,
} from "./patient.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = new Hono();

// Public Route
router.get("/search", searchPatients);

// Protected Routes
router.use("/*", authMiddleware);

router.post("/", createPatient);
router.get("/:id", getPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
