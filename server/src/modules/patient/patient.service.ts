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
import { osClient } from "../../lib/opensearch.js";

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

  // save data to opensearch index
  await osClient.index({
    index: "patients",
    id: patient.id,
    body: patient,
  });

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
      UpdateExpression:
        "set #name = :name, #address = :address, #conditions = :conditions, #allergies = :allergies",
      ExpressionAttributeNames: {
        "#name": "name",
        "#address": "address",
        "#conditions": "conditions",
        "#allergies": "allergies",
      },
      ExpressionAttributeValues: {
        ":name": data.name,
        ":address": data.address,
        ":conditions": data.conditions,
        ":allergies": data.allergies,
      },
      ReturnValues: "ALL_NEW",
    }),
  );

  const updatedAttributes = result.Attributes;

  // OpenSearch Sync (Partial Update)
  if (updatedAttributes) {
    await osClient.update({
      index: "patients",
      id: id,
      body: {
        doc: updatedAttributes, // update attributes
      },
      refresh: true,
    });
  }

  return updatedAttributes;
};

export const deletePatientDB = async (id: string) => {
  await docClient.send(
    new DeleteCommand({
      TableName: env.DYNAMO_TABLE,
      Key: { id },
    }),
  );

  // delete data from opensearch index
  await osClient.delete({
    index: "patients",
    id: id,
  });

  return true;
};

// Search patients by condition or allergies
export const searchPatientsDB = async (query: {
  conditions?: string;
  allergies?: string;
}) => {
  // create an array of must queries
  const mustQueries = [];

  // if condition is provided then add it to the search
  if (query.conditions) {
    mustQueries.push({
      match: {
        conditions: {
          query: query.conditions,
          fuzziness: "AUTO",
        },
      },
    });
  }

  // if allergies is provided then add it to the search
  if (query.allergies) {
    mustQueries.push({
      match: {
        allergies: {
          query: query.allergies,
          fuzziness: "AUTO",
        },
      },
    });
  }

  // search in opensearch
  const response = await osClient.search({
    index: "patients",
    body: {
      query: {
        bool: {
          should: mustQueries, // it means either condition or allergies should match
          minimum_should_match: 1,
        },
      },
    },
  });

  // return the data from the search
  return response.body.hits.hits.map((hit) => ({
    id: hit._id,
    ...hit._source,
  }));
};
