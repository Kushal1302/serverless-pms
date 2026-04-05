import { Client } from "@opensearch-project/opensearch";
import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";
import { env } from "../config/env.js";

// create opensearch client
export const osClient = new Client({
  ...AwsSigv4Signer({
    region: env.AWS_REGION!,
    service: "es",
    getCredentials() {
      return Promise.resolve({
        accessKeyId: env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
      });
    },
  }),
  node: env.AWS_OPENSEARCH_URL!,
});
