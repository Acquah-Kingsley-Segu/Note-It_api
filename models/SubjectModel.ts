import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: String
})

export default mongoose.model('Subject', SubjectSchema);