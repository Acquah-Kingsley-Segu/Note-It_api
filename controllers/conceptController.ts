import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ConceptModel from "../models/ConceptModel";
import { NullExpression, Document } from "mongoose";

export const get_concepts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const concepts = await ConceptModel.find().populate("topic").exec()
    if (concepts.length > 0)
        res.json(concepts)
    res.json({
        data: [],
        message: "No concept has been created yet. Try creating one"
    })  
});

export const get_concept = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const concept: Document | NullExpression = await ConceptModel.findById(req.params.id).populate("topic").exec()
    if (concept)
        res.json({
            data: concept,
            message: "1 concept data was queried"
        });
    else
        res.json({
            data: {},
            message: `Concept with id ${req.params.id} does not exist`
        });

})

export const create_concept = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const concept = await ConceptModel.findOne({ name: req.body.name }).exec();
    console.log(concept)
    if (!concept){
        const new_concept = await ConceptModel.create({
            name: req.body.name,
            start: req.body.start,
            end: req.body.end,
            reopen: req.body.reopen,
            description: req.body.description,
            topic: req.body.topic
        })
        res.json({
            data: new_concept,
            message: "Concept was created successfully"
        })
    }
    else{
        res.status(409);
        res.json({
            data: [],
            message: `Concept with name ${req.body.name} alreadt exist`
        })
    }
})

export const update_concept = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const concept: Document | NullExpression = await ConceptModel.findById(req.params.id).exec()
    if (concept){
        await ConceptModel.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            start: req.body.start,
            end: req.body.end,
            reopen: req.body.reopen,
            description: req.body.description,
            topic: req.body.topic
        });
        const updated_concept: Document | NullExpression = await ConceptModel.findById(req.params.id).populate("topic").exec();
        res.json({
            data: updated_concept,
            message: `Concept with id ${req.params.id} was updated successfully`
        });
    }
    else{
        res.json({
            data: {},
            message: `Concept with id ${req.params.id} does not exist`
        })
    }
});

export const del_concept = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const del_concept = await ConceptModel.findByIdAndDelete(req.params.id).exec();
    if (del_concept)
        res.json({ message:`Concept with id ${req.params.id} has been deleted successfully`});
    else
        res.json({ message:`Concept with id ${req.params.id} does not exist`});
})