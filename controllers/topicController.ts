import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import TopicModel from "../models/TopicModel";
import { Document, Model, NullExpression } from "mongoose";


// GET all topics
export const get_topics = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const topics = await TopicModel.find().populate("subject").exec()
    if (topics.length > 0)
        res.json({data: topics, message: `${topics.length} data was queried`})
    res.json({
        data: [],
        message: "No topic has been created yet. Try creating one"
    })
});

// GET a topic
export const get_topic = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const topic: Document | NullExpression = await TopicModel.findById(req.params.id).exec()

    if (topic)
    {
        res.json({
            data: topic,
            message: "1 topic data was queried"
        });
    }
    else{
        res.json({
            data: {},
            message: `Topic with id ${req.params.id} does not exist`
        })
    }
});

export const create_topic = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const topic = await TopicModel.findOne({ name: req.body.name }).exec(); 
    if (!topic){
        const new_topic = await TopicModel.create({ 
            name: req.body.name,
            start: req.body.start,
            end: req.body.end,
            reopen: req.body.reopen,
            subject: req.body.subject
        })
        res.json({
            data: new_topic,
            message: "Topic was created successfully"
        })
    }
    else{
        res.status(409)
        res.json({
            message: `Topic with name ${topic.name} already exist`
        });
    }
});

export const update_topic = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const topic: Document | NullExpression = await TopicModel.findById(req.params.id).exec();
    if (topic){
        await TopicModel.findByIdAndUpdate(req.params.id, { 
            name: req.body.name,
            start: req.body.start,
            end: req.body.end,
            reopen: req.body.reopen,
            subject: req.body.subject
        });
        const topic_updated: Document | NullExpression = await TopicModel.findById(req.params.id).exec(); 
        res.json({
            data: topic_updated,
            message: `Tpoic with id ${req.params.id} was updated successfully`
        });
    }
    else{
        res.json({
            data: {},
            message: `Topic with id ${req.params.id} does not exist`
        })
    }
});

// DELETE a topic
export const delete_topic = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const del_topic: Document | NullExpression = await TopicModel.findByIdAndDelete(req.params.id);
    if (del_topic){
        res.json({ message:`Topic with id ${req.params.id} has been deleted successfully`});
    }
    else{
        res.json({ message:`Topic with id ${req.params.id} does not exist`});
    }
})