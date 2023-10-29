import express, { Router, Request, Response } from "express"
import notes from "../data/notes";
import { create_note, del_note, get_note, get_notes, update_note } from "../controllers/noteController";
import { del_concept } from "../controllers/conceptController";

const NoteRouter: Router = express.Router()

NoteRouter.get("/", get_notes);

NoteRouter.get("/:id", get_note)

NoteRouter.post("/create", create_note)

NoteRouter.put("/update/:id", update_note);

NoteRouter.delete("/delete/:id", del_note)

export default NoteRouter;