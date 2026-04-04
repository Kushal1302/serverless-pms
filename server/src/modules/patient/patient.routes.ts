import { Hono } from "hono";
import {
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
} from "./patient.controller.js";

const router = new Hono();

router.post("/", createPatient);
router.get("/:id", getPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
