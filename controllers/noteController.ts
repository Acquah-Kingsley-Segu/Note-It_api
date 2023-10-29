import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import NoteModel from "../models/NoteModel"

export const get_notes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const notes = await NoteModel.find().populate("concept").exec()
    if (notes.length > 0)
        res.json({
            data: notes,
            message: `${notes.length} notes were queried`
        });
    else
        res.json({
            data: [],
            message: "No note has been created yet. Try creating one"
        });
});

export const get_note = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const note = await NoteModel.findById(req.params.id).populate("concept").exec()
    if (note)
        res.json({
            data: note,
            message: `1 note data was queried`
        });
    else
        res.json({
            data: {},
            message: `Note with id ${req.params.id} does not exist`
        });
});

export const create_note = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const note = await NoteModel.findOne({ name: req.body.title }).exec();
    if (!note){
        const new_note = await NoteModel.create({
            title: req.body.title,
            content: req.body.content,
            youtube: req.body.youtube,
            website: req.body.website,
            book: req.body.book,
            concept: req.body.concept
        })
        res.json({
            data: new_note,
            message: "Note was created successfully"
        })
    }
    else{
        res.status(409);
        res.json({
            data: [],
            message: `Note with title ${req.body.title} alreadt exist`
        })
    }
})

export const update_note = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const updated_note = await NoteModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        youtube: req.body.youtube,
        website: req.body.website,
        book: req.body.book,
        concept: req.body.concept
    }).exec();
    if (updated_note){
        res.json({
            data: updated_note,
            message: "Note was updated successfully"
        })
    }
    else{
        res.status(409);
        res.json({
            data: [],
            message: `Note with title ${req.body.id} does not exist`
        })
    }
});

export const del_note = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const del_concept = await NoteModel.findByIdAndDelete(req.params.id).exec();
    if (del_concept)
        res.json({ message:`Note with id ${req.params.id} has been deleted successfully`});
    else
        res.json({ message:`Note with id ${req.params.id} does not exist`});
})