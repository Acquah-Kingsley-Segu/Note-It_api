import * as dotenv from "dotenv";
import express, {Express, Request, Response, urlencoded} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import topics_router from "./routers/topicRouter";
import concept_router from "./routers/conceptRouter";
import NoteRouter from "./routers/noteRouter";
import DBConnect from "./config/dbConnConfig";
import mongoose from "mongoose";
import SubjectRouter from "./routers/subjectRouter";


dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

// Connect to mongoDB
DBConnect(process.env.DBUSER, process.env.DBPASSWORD, process.env.DBNAME);

mongoose.connection.once('open', () => {
  console.log("Database connected successfully");
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
})

// Loading built-in middlewares
app.use(logger('dev'));
app.use(express.json()); // to help populate req.body with form data
app.use(express.urlencoded({ extended: false })); // populate req.body with query parameters
app.use(cookieParser())

// Loading the application routes
app.use("/subjects", SubjectRouter)
app.use("/topics", topics_router);
app.use("/concepts", concept_router);
app.use("/notes", NoteRouter)
