import express, {Router, Request, Response, NextFunction} from "express"
import topics from "../data/topics";
import { request } from "http";

const topics_router: Router = express.Router();

// Get the list of topics created
topics_router.get('/', (req: Request, res: Response) => {
  res.json(topics)
});

// GET, PUT and DELETE a topi
topics_router.route("/:topic_id")
.get((req: Request, res: Response, next: NextFunction) => {
  const topicID = Number(req.params.topic_id)

  if(topicID === 0) next("route");
  console.log("Not skipped");
  
  const topic = topics.filter(topic => topic.id === topicID)

  return res.json(topic);
})
.put((req: Request, res: Response) => {
  const topicID = Number(req.params.topic_id)

  
})

export default topics_router;