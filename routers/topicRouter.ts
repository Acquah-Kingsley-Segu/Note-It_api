import express, {Router, Request, Response, NextFunction} from "express"
import topics from "../data/topics";
import { request } from "http";
import { create_topic, delete_topic, get_topic, get_topics, update_topic } from "../controllers/topicController";

const topicRouter: Router = express.Router();

// GET the list of all topics created
topicRouter.get('/', get_topics);

// GET a topic
topicRouter.get("/:id", get_topic)

// POST a new topic
topicRouter.post("/create", create_topic)

// UPDATE a topic
topicRouter.put("/update/:id", update_topic)

// DELETE a topic
topicRouter.delete("/delete/:id", delete_topic)

export default topicRouter;