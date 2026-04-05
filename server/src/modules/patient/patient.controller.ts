import type { Context } from "hono";
import { createPatientSchema } from "./patient.schema.js";
import { fail, success } from "../../utils/response.js";
import {
  createPatientDB,
  deletePatientDB,
  getPatientByIdDB,
  updatePatientDB,
} from "./patient.service.js";

// Create a new patient
export const createPatient = async (c: Context) => {
  try {
    // Get the request body
    const body = await c.req.json();

    // Validate the request body
    const parsed = createPatientSchema.safeParse(body);

    // Return error if validation fails
    if (!parsed.success) {
      return c.json(fail("Validation failed", parsed.error.flatten()), 400);
    }

    // Create patient in DynamoDB
    const patient = await createPatientDB(parsed.data);

    return c.json(success(patient, "Patient created successfully"), 201);
  } catch (err: any) {
    console.log(err);
    return c.json(fail(err.message), 500);
  }
};

// Get a patient by ID
export const getPatient = async (c: Context) => {
  try {
    // Get the patient ID from the request parameters
    const id = c.req.param("id");

    // Return error if patient ID is not provided
    if (!id) {
      return c.json(fail("Patient ID is required"), 400);
    }

    // Get patient from DynamoDB
    const patient = await getPatientByIdDB(id);

    // Return error if patient not found
    if (!patient) {
      return c.json(fail("Patient not found"), 404);
    }

    // Return the patient
    return c.json(success(patient));
  } catch (err: any) {
    return c.json(fail(err.message), 500);
  }
};

export const updatePatient = async (c: Context) => {
  try {
    // Get the patient ID from the request parameters
    const id = c.req.param("id");

    // Get the request body
    const body = await c.req.json();

    // Return error if patient ID is not provided
    if (!id) {
      return c.json(fail("Patient ID is required"), 400);
    }

    // Validate the request body
    const parsed = createPatientSchema.safeParse(body);

    // Return error if validation fails
    if (!parsed.success) {
      return c.json(fail("Validation failed", parsed.error.flatten()), 400);
    }

    // Update patient in DynamoDB
    const patient = await updatePatientDB(id, parsed.data);

    // Return error if patient not found
    if (!patient) {
      return c.json(fail("Patient not found"), 404);
    }

    return c.json(success(patient, "Patient updated successfully"), 200);
  } catch (err: any) {
    return c.json(fail(err.message), 500);
  }
};

export const deletePatient = async (c: Context) => {
  try {
    // Get the patient ID from the request parameters
    const id = c.req.param("id");

    // Return error if patient not found
    if (!id) {
      return c.json(fail("Patient ID is required"), 400);
    }

    // Delete patient from DynamoDB
    const patient = await deletePatientDB(id);

    // Return error if patient not found
    if (!patient) {
      return c.json(fail("Patient not found"), 404);
    }

    return c.json(success({}, "Patient deleted successfully"), 200);
  } catch (err: any) {
    console.log(err);
    return c.json(fail(err.message), 500);
  }
};
