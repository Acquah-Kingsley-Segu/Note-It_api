import express, { Router } from 'express'
import { create_subject, delete_subject, get_subject, subject_lists, update_subject } from '../controllers/subjectController';

const SubjectRouter: Router = express.Router();

// home route
SubjectRouter.get("/", subject_lists);

// Reading a single subject instance
SubjectRouter.get("/:id", get_subject);

// Create a new subject
SubjectRouter.post("/create", create_subject)

// Update an existing subject data
SubjectRouter.put("/update/:id", update_subject)

// Delete an existing subject data
SubjectRouter.delete("/delete/:id", delete_subject)

export default SubjectRouter;