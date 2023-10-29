import express, { Router, Request, Response, NextFunction } from "express";
import concepts from "../data/concepts";
import { create_concept, del_concept, get_concept, get_concepts, update_concept } from "../controllers/conceptController";

const concept_router: Router = express.Router()

concept_router.get("/", get_concepts);

concept_router.get("/:id", get_concept);

concept_router.post("/create", create_concept);

concept_router.put("/update/:id", update_concept);

concept_router.delete("/delete/:id", del_concept);

export default concept_router;