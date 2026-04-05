import { CognitoJwtVerifier } from "aws-jwt-verify";
import { env } from "../config/env.js";

export const verifier = CognitoJwtVerifier.create({
  userPoolId: env.AWS_USERS_POOL_ID,
  tokenUse: "access",
  clientId: env.AWS_APP_CLIENT_ID,
});
