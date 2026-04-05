import { Hono } from "hono";
import {
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
} from "./patient.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = new Hono();

router.post("/", authMiddleware, createPatient);
router.get("/:id", authMiddleware, getPatient);
router.put("/:id", authMiddleware, updatePatient);
router.delete("/:id", authMiddleware, deletePatient);

export default router;
