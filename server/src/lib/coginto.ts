import { CognitoJwtVerifier } from "aws-jwt-verify";
import { env } from "../config/env.js";

export const verifier = CognitoJwtVerifier.create({
  userPoolId: env.AWS_COGNITO_USERS_POOL_ID!,
  tokenUse: "access",
  clientId: env.AWS_COGNITO_APP_CLIENT_ID!,
});
