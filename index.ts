import * as dotenv from "dotenv";
import express, {Express, Request, Response} from "express";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
