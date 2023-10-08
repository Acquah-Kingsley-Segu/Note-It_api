import express, { Router, Request, Response, NextFunction } from "express"
import notes from "../data/notes";

const notes_router: Router = express.Router()

notes_router.get("/", (req: Request, res: Response) => {
    res.json(notes);
});

export default notes_router;