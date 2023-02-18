import * as http from "http";
import * as express from "express";
import { routers } from "../routers";

const app = express();

app.use(express.json());
app.use(routers);

const server = http.createServer(app);

export { server };
