import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import SubjectModel from "../models/SubjectModel";
import mongoose, { Document, NullExpression } from "mongoose";

// GET all subjects
export const subject_lists = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subjects = await SubjectModel.find({}).exec();
    if(subjects.length > 0)
        res.json(subjects);
    res.json({ message: "There are not subject data" })
})

// GET a subject
export const get_subject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id: String = req.params.id
    let exist: { _id: mongoose.Types.ObjectId } | NullExpression = await SubjectModel.exists({name: req.body.name, description: req.body.description})
    if (!exist)
    {
        const subject: Document | NullExpression = await SubjectModel.findById(id).exec();
        res.json(subject);
    }
    res.json({ message:`Document with id ${req.params.id} does not exist` })
});

// POST a new subject
export const create_subject = asyncHandler(async (req:Request, res:Response, next: NextFunction) => {
    let exist: { _id: mongoose.Types.ObjectId} | NullExpression = await SubjectModel.exists({ name: req.body.name, description: req.body.description })
    if(!exist){
        const subject: Document | NullExpression = await SubjectModel.create({ name: req.body.name, description: req.body.description })
        res.json({body: subject, message: "Subject was created successfully"})
    }
    else
        res.json({ message:`Subject with name "${req.body.name}" and description "${req.body.description}" already exist`})
})

// PUT to edit an existing subject
export const update_subject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let isExist: Document | NullExpression = await SubjectModel.findById({ _id: req.params.id })
    if (isExist !== null)
    {
        await SubjectModel.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description})
        const subject = await SubjectModel.findById(req.params.id).exec()
        res.json({ 
            body: subject,
            message: `Subject with ${req.params.id} had been updated successfully`
        });
    }
    res.json({ message:`Document with id ${req.params.id} does not exist`});
})

// DELETE an existing subject
export const delete_subject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let isExist: Document | NullExpression = await SubjectModel.findById({ _id: req.params.id })
    
    if (isExist !== null)
    {
        await SubjectModel.findByIdAndDelete(req.params.id, { name: req.body.name, description: req.body.description })
        res.json({ message:`Subject with id ${req.params.id} has been deleted successfully`});
    }
    res.json({ message:`Document with id ${req.params.id} does not exist`});
})