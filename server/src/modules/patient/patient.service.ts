import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../lib/dynamo.js";
import { env } from "../../config/env.js";
import { v4 as uuid } from "uuid";
import type { Patient } from "./patient.types.js";

// Create a new patient in DynamoDB
export const createPatientDB = async (data: Patient) => {
  // Create patient object with unique ID
  const patient = {
    ...data,
    id: uuid(),
  };

  // Add patient to DynamoDB
  await docClient.send(
    new PutCommand({
      TableName: env.DYNAMO_TABLE,
      Item: patient,
    }),
  );

  return patient;
};

export const getPatientByIdDB = async (id: string) => {
  // Get patient from DynamoDB
  const result = await docClient.send(
    new GetCommand({
      TableName: env.DYNAMO_TABLE,
      Key: { id },
    }),
  );

  return result.Item;
};

// Update a patient in DynamoDB
export const updatePatientDB = async (id: string, data: Patient) => {
  const result = await docClient.send(
    new UpdateCommand({
      TableName: env.DYNAMO_TABLE,
      Key: { id },
      UpdateExpression: "set #name = :name",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": data.name,
      },
      ReturnValues: "ALL_NEW",
    }),
  );

  return result.Attributes;
};

export const deletePatientDB = async (id: string) => {
  await docClient.send(
    new DeleteCommand({
      TableName: env.DYNAMO_TABLE,
      Key: { id },
    }),
  );

  return true;
};
