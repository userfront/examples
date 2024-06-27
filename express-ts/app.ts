import express from "express";
import http from "http";

import { indexRouter } from "./routes";

const app = express();

app.use("/", indexRouter);

const PORT = process.env.PORT || "3003";

app.set("port", PORT);

var server = http.createServer(app);

server.listen(PORT);
