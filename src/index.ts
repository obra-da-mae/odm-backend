import * as serverless from "serverless-http";
import { server } from "./configs/server-config";

export const handler = serverless(server);
