// Load environment variables from .env file
import "dotenv/config";

export const env = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  AWS_REGION: process.env.AWS_REGION!,
  DYNAMO_TABLE: process.env.DYNAMO_TABLE!,
};
