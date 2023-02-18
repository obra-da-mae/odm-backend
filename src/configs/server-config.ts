import * as express from "express";
import { routers } from "../routers";

const server = express();

server.use(express.json());
server.use(routers);

export { server };
