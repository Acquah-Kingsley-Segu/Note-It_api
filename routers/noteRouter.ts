import express, { Router, Request, Response } from "express"
import notes from "../data/notes";

const NoteRouter: Router = express.Router()

NoteRouter.get("/", (req: Request, res: Response) => {
    res.json(notes);
});

export default NoteRouter;