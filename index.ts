import * as dotenv from "dotenv";
import express, {Express, Request, Response} from "express";
import path from "path"
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors"
import topics from "./data/topics";
import topics_router from "./routers/topic_router";
import concept_router from "./routers/concepts_router";
import notes_router from "./routers/notes_router";


dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

// Loading the application routes
app.use("/topics", topics_router);
app.use("/concepts", concept_router);
app.use("/notes", notes_router)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
