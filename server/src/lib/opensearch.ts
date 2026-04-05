import { Client } from "@opensearch-project/opensearch";
import { env } from "../config/env.js";

export const osClient = new Client({
  node: env.AWS_OPENSEARCH_URL!,
});
