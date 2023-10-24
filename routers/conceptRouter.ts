import express, { Router, Request, Response, NextFunction } from "express";
import concepts from "../data/concepts";

const concept_router: Router = express.Router()

concept_router.get("/", (req: Request, res: Response) => {
    res.json(concepts);
});

export default concept_router;